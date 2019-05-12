import RssLandingPagesConfig,  { SiteRss, EndPoint } from './rssLandingPages.config';
import { FireBaseMainDB } from '@firebaseDB'
import { switchMap, mergeMap, map, tap } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';
import RssHttp from './rssLandingPages.http.module';
import { Item } from './rssLandingPages.types';
import  WordFilter  from './rssLandingPages.filter';
const log = console.log

const entities = require("entities");

// const Entities = require('html-entities').AllHtmlEntities;
// const entities = new Entities();

export interface LiveSite {
    site:string;
    endpoints: EndPoint[]
}
export interface CleanStory {
    title:string;
    date:string;
    storyLink:string;
    imageLink:string;
    description:string;
}
export default class RssLandingPages {
    private config:RssLandingPagesConfig;
    private rssEndPointsDb:firebase.firestore.CollectionReference;
    private rssFeedsDb:firebase.firestore.CollectionReference;
    private manualFeedsDb:firebase.firestore.CollectionReference;
    private manualFeedEndPointsDb:firebase.firestore.CollectionReference;
    private customFilter:WordFilter;

    constructor() {
        this.init();
    }
    
    private init() {
        this.config = new RssLandingPagesConfig()
        this.rssEndPointsDb = FireBaseMainDB.collection('rssEndPoints');
        this.rssFeedsDb = FireBaseMainDB.collection('rssFeeds');
        this.manualFeedsDb = FireBaseMainDB.collection('manualFeeds');
        this.manualFeedEndPointsDb = FireBaseMainDB.collection('manualFeedEndPoints');
        this.customFilter = new WordFilter({placeHolder: "*"})
    }

    addSiteToEndPoints(siteName:string) {
        return this.config.getRssSiteByName$(siteName)
            .pipe(
                switchMap( siteConfig => {
                    const data = {};
                    data[siteConfig['name']] = siteConfig;
                    return this.rssEndPointsDb.doc('allEndPoints').update( data )
                })
            )
    }
    updateAllEndPoints() {
        return this.config.getRssSites$()
        .pipe(
            mergeMap((sitesConfig:SiteRss[]) =>forkJoin(sitesConfig.map(site => this.saveRssEndPointToDb(site))) )
        )     
    }
    getAllRssFeeds() {
        return this.config.getRssSites$()
    }

    parseAndLoadSiteFeedsToDB(site:LiveSite, storyCount:number = 8) {
        return of(site)
        .pipe(
            mergeMap((site) => forkJoin(site.endpoints.map(endpoint => this.parseRssFeed(site.site, endpoint, storyCount))))
        )
    }

    parseAndLoadSiteFeedToDB(site:any, storyCount:number = 8) {
        return of(site)
        .pipe(
            switchMap(endpoint => this.parseRssFeed(site.site, endpoint, storyCount))
        )
    }
    getEndPoint(sitename:string, endpoint:string) {
        return this.config.getRssSiteEndPoint$(sitename, endpoint)
    }

    getRssFeed(feedUrl:string) {
        return RssHttp.getRssFeed(feedUrl);
    }
    parseRssFeed(siteName:string, feed:any, storyCount:number = 8) {
        console.log("Got", feed)
        return this.getRssFeed(feed.link)
            .pipe(
                tap(d => console.log("Got Back", d)),
                map(res => res.items),
                map(stories => {
                    let cleanedStories = [];
                    stories.map(story => {
                        if(cleanedStories.length === storyCount) return;
                        const cleanTitleAndDescription = this.filterWords(story.title, story.description)
                        if(!cleanTitleAndDescription.clean || story.media[0].url === '') return;
                        cleanedStories.push({
                            title: cleanTitleAndDescription.title,
                            date: story.date,
                            storyLink: story.link,
                            imageLink: story.media[0].url,
                            description: cleanTitleAndDescription.description
                        })
                    })
                    return cleanedStories
                }),
                tap(() => console.log("Site", siteName, "Vertical", feed.endPoint)),
                switchMap(stories => this.saveRssFeedToDb(siteName, feed.endPoint, stories))
            )
    }
    parseAndReturnRssFeed(siteName:string, feed:any, storyCount:number = 8) {
        return this.getRssFeed('http://rssfeeds.knoxnews.com/knoxville/sports/ut-football/&x=1')
            .pipe(
                tap(d => console.log("GOT BACK", d)),
                map(res => res.items),
                map(stories => {
                    let cleanedStories = [];
                    stories.map(story => {
                        if(cleanedStories.length === storyCount) return;
                        const cleanTitleAndDescription = this.filterWords(story.title, story.description)
                        if(!cleanTitleAndDescription.clean || story.media[0].url === '') return;
                        cleanedStories.push({
                            title: cleanTitleAndDescription.title,
                            date: story.date,
                            storyLink: story.link,
                            imageLink: story.media[0].url,
                            description: cleanTitleAndDescription.description
                        })
                    })
                    return cleanedStories
                }),
                // tap(() => console.log("Site", siteName, "Vertical", feed.endPoint)),
                // switchMap(stories => this.saveRssFeedToDb(siteName, feed.endPoint, stories))
            )
    }
    saveRssFeedToDb(site:string, vertical:string, stories:CleanStory[]) {
        return this.rssFeedsDb.doc(site)
            .collection(vertical).doc('stories').set({stories})
    }
    parseRssFeedByGuidTag(feed:any, parseByPhrase:string, storyCount:number = 8) {
        const { items } = feed; 
        return of(items.filter(item => item.guid.includes(parseByPhrase)))
            .pipe(
                map(stories => {
                    let cleanedStories = []
                    stories.map((story:any) => {
                        const cleanTitleAndDescription = this.filterWords(story.title, story.description)
                        if(!cleanTitleAndDescription.clean) return; 
                        cleanedStories.push({
                            title: cleanTitleAndDescription.title,
                            date: story.date,
                            storyLink: story.link,
                            imageLink: story.media[0].url,
                            description: cleanTitleAndDescription.description
                        })                       
                    })
                    return cleanedStories
                })
            )
    }
    parseRssFeedByLinkTag(feed:any, storyCount:number = 8) {
        const regex = /\/suburbs\/(germantown)\/|\/suburbs\/(collierville)\//;
        const { items } = feed; 
        let germantown = []; let collierville = [];
        items.map((story:any) => {
            const capture = story.guid.match(regex);
            if(capture === null) return;
            const captureGroup = capture[1] === undefined ? 2 : 1;
            const cleanTitleAndDescription = this.filterWords(story.title, story.description)
            if(!cleanTitleAndDescription.clean) return;
            if(captureGroup === 1) {
                if(germantown.length === storyCount) return
                germantown.push({
                    title: cleanTitleAndDescription.title,
                    date: story.date,
                    storyLink: story.link,
                    imageLink: story.media[0].url,
                    description: cleanTitleAndDescription.description
                })
            } else {
                if(collierville.length === storyCount) return
                collierville.push({
                    title: cleanTitleAndDescription.title,
                    date: story.date,
                    storyLink: story.link,
                    imageLink: story.media[0].url,
                    description: cleanTitleAndDescription.description
                })
            }

        })

        return of({ collierville, germantown })
    }
    
    private filterWords(title:string, description:string): { clean?:boolean, title?:string, description?:string} {
        const wordsFilteredReg = /\*\*\*+/gm;

        const verifiedTitle = this.customFilter.clean(title);
        if(verifiedTitle.match(wordsFilteredReg) !== null) return { clean: false};
        const CLEAN_TITLE = entities.decodeHTML(verifiedTitle.replace(/\&pos;/gm, '"'));

        const descrReg = /^(.*?)</;
        const trimmedDescription = description.match(descrReg);
        const verifiedDescription = this.customFilter.clean(trimmedDescription[1])
        if(verifiedDescription.match(wordsFilteredReg) !== null) return { clean: false};
        const htmlEntititeStrippedDesciption = entities.decodeHTML(verifiedDescription)
        const CLEAN_DESCRIPTION = this.cutStringToLength(htmlEntititeStrippedDesciption.replace(/\&pos;/gm, "'"), 97)
        
        return { clean: true, title: CLEAN_TITLE, description: CLEAN_DESCRIPTION}
    }
    private saveRssEndPointToDb(siteConfig:SiteRss) {
        const data = {};
        data[siteConfig['name']] = siteConfig; 
        return this.rssEndPointsDb.doc('allEndPoints').update( data )
    }

    private decodeAndTrim(str: string, lgth:number) {
        const descriptionRegex = /^(.*?)</;
        if(str === '') return
        const description = str.match(descriptionRegex);
        const decoded = this.decodeHtmlEntity(description[1]);
        const trimmed = this.cutStringToLength(decoded, lgth)
        return trimmed
    }
    private decodeHtmlEntity(str: string) {
        return str.replace(/&#(\d+);/g, function(match, dec) {
          return String.fromCharCode(dec);
        });
      };
      
    private cutStringToLength(str:string, lgth:number) {
        if(str.length > lgth) {
          let newStr;
          if(str.charCodeAt(lgth) !== 32) {
              const cutStr = str.slice(0, lgth)
              const idx = cutStr.lastIndexOf(" ");
              newStr = cutStr.substring(0, idx)
              return newStr.trim();
          }
         newStr = str.slice(0, lgth).trim();
         return newStr;
      }
        return str;
      }
}

