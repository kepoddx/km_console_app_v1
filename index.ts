import { genMod, tSeedDb } from '@tasks';
import { getCleanJsonFile } from '@facebook';
import { listFiles } from '@data';
import { parseContentFile, saveToFile } from '@libs'
import { catchError, switchMap, map, mergeMap, tap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import RssLandingPagesConfig, { EndPoint } from './src/libs/landingPages/rssLandingPages.config';
import RssLandingPages, { LiveSite } from './src/libs/landingPages/rssLandingPages.module';
const log = console.log
/** 
 * ========================================
 *  Variables To Test Declared Functions
 * ======================================== */

const APP_CHOICES = [
    { name: 'generateModule', message: 'Generate a Module' },
    { name: 'seedLocalDbFbAdAccounts', message: 'Seed NeDb Facebook Ad Accounts' }
]
const fbAccountsFile = 'fbAdAccounts';
const fbAudienceFile = 'fbAudiences';
const fbAudienceData = {
    account_id: '23843220233570182',
    listUploadDate: '3.5.19',
    audience: {
        name: 'AG Paywall Converters Exclusions 3.5.19',
        description: "Paywall Converters Exclude from Ad"
    }
};
const readDataDir = 'emailLists';
/** 
 * ========================================
 *  End Variables To Test Declared Functions
 * ======================================== */

function generateModule() {
    genMod()
        .subscribe(d => log(d))
}
// seedLocalDbFbAdAccounts(fbAccountsFile)
function seedLocalDbFbAdAccounts(fileName: string) {
    getCleanJsonFile(fileName)
        .pipe(
            switchMap(sites => tSeedDb(fileName, sites)),
            catchError(err => of(err))
        )
        .subscribe(r => log(r))
}

// seedLocalDbFbAdAudiences(fbAudienceFile, fbAudienceData)
function seedLocalDbFbAdAudiences(fileName: string, data) {
    of(data)
        .pipe(
            switchMap(sites => tSeedDb(fileName, sites)),
            catchError(err => of(err))
        )
        .subscribe(r => log(r))
}

// listDataFiles(readDataDir)
function listDataFiles(dirName: string) {
    listFiles(dirName)
        .pipe(
            map((fileList) => fileList[1])
        )
        .subscribe(r => log(r))
}
// testRssFeed('http://rssfeeds.greenvilleonline.com/greenville/sports&x=1', 8)
// testRssFeed('knoxville', 'goKnox')
function testRssFeed(siteName:string, endPoint:string, storyCount:number = 8) {
    const rss = new RssLandingPages();
    rss.getEndPoint(siteName, endPoint)
    .pipe(
        map(endPointConfig => endPointConfig[0]),
        switchMap(feed => rss.parseAndReturnRssFeed(siteName, feed))
    )
    .subscribe(r => console.log(r))
}


function combineFeeds(siteName:string) {

}
// addRssEndpoint('greenville')
function addRssEndpoint(siteName:string) {
    const rss = new RssLandingPages();
    rss.addSiteToEndPoints(siteName)
        .subscribe(d => log(d))
}

// updateAllEndpoints()
function updateAllEndpoints() {
    const rss = new RssLandingPages();
    rss.updateAllEndPoints()
        .subscribe(d => log(d))
}


// splitRssStreamByLinkTag('memphis', 'suburbs', 8)
function splitRssStreamByLinkTag(sitename: string, endpoint: string, storyCount: number) {
    const rss = new RssLandingPages();
    rss.getEndPoint(sitename, endpoint)
        .pipe(
            map(d => d[0]),
            switchMap((endPointConfig: EndPoint) => rss.getRssFeed(endPointConfig.link)),
            switchMap(feedData => rss.parseRssFeedByLinkTag(feedData, storyCount)),
            map(splitStories => {
                const feeds = [];
                for (const vertical in splitStories) {
                    feeds.push({ site: sitename, endPoint: vertical, stories: splitStories[vertical] })
                }
                return feeds
            }),
            mergeMap(feeds => forkJoin(feeds.map(feed => rss.saveRssFeedToDb(feed.site, feed.endPoint, feed.stories))))
        )
        .subscribe(d => log(JSON.stringify(d)))
}
// parseRssStreamByGuidTag('greenville', 'sports', 8)
function parseRssStreamByGuidTag(sitename: string, endpoint: string, storyCount: number) {
    const rss = new RssLandingPages();
    rss.getEndPoint(sitename, endpoint)
        .pipe(
            map(d => d[0]),
            switchMap((endPointConfig: EndPoint) => rss.getRssFeed(endPointConfig.link)),
            switchMap(feedData => rss.parseRssFeedByGuidTag(feedData, 'clemson', storyCount)),
            switchMap((cleanedStories:any) => rss.saveRssFeedToDb(sitename, endpoint, cleanedStories)),
        )
        .subscribe(d => log(JSON.stringify(d)))
}


// updateAllRssFeeds()
function updateAllRssFeeds(storyCount: number = 8) {
    const rss = new RssLandingPages();
    rss.getAllRssFeeds()
        .pipe(
            map(sitesConfig => sitesConfig.map(site => ({ site: site.name, endpoints: site.liveEndPoints }))),
            mergeMap((sitesLiveConfg: LiveSite[]) => forkJoin(sitesLiveConfg.map((site: LiveSite) => rss.parseAndLoadSiteFeedsToDB(site, storyCount))))
        )
        .subscribe(d => log(JSON.stringify(d)))
}

updateRssFeed('knoxville', 'knoxBiz')
function updateRssFeed(siteName: string, endpoint: string, storyCount: number = 8) {
    const rss = new RssLandingPages();
    rss.getEndPoint(siteName, endpoint)
        .pipe(
            tap(d => console.log(d))
            // map(sitesConfig => ({ site: siteName, link: sitesConfig.link })),
            // switchMap((site:any) =>  rss.parseAndLoadSiteFeedToDB(site, storyCount))
        )
        .subscribe(d => log(JSON.stringify(d)))
}
const specialFeeds = [
    { site: 'greenvile', endpoint: 'sports', parseByPhrase: 'clemson'}
]

updateRssFeedWthException(specialFeeds)
function updateRssFeedWthException(feedsConfig: any[], storyCount: number = 8) {
    const rss = new RssLandingPages();

}

// const exclusisons = [
//     { site: 'memphis', endpoint: 'suburbs' },
//     { site: 'greenvile', endpoint: 'sports'}
// ];
// updateAllRssFeedsWithExclusions(exclusisons)
function updateAllRssFeedsWithExclusions(exclusions: any[]) {
    const rss = new RssLandingPages();
    const exclusionMap = new Set();
    exclusions.map(exclusion => exclusionMap.add(`${exclusion.site}-${exclusion.endpoint}`))
    rss.getAllRssFeeds()
        .pipe(
            map(sitesConfig => sitesConfig.map(site => {
                const filteredEndpoints = site.liveEndPoints.filter(endpoint => exclusionMap.has(`${site.name}-${endpoint.endPoint}`) === false)
                return { site: site.name, endpoints: filteredEndpoints }
            })),
            mergeMap((sitesLiveConfg: LiveSite[]) => forkJoin(sitesLiveConfg.map((site: LiveSite) => rss.parseAndLoadSiteFeedsToDB(site))))
        )
        .subscribe(d => log(JSON.stringify(d)))
}

// const landingPageRawFile = "trueCrime.csv"
// transformRawContentPageData(landingPageRawFile)
function transformRawContentPageData(fileName: string) {
    parseContentFile(fileName)
        .subscribe(r => {
            saveToFile('trueCrime.json', r)
        })
}
