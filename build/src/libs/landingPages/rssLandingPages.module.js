"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rssLandingPages_config_1 = require("./rssLandingPages.config");
var _firebaseDB_1 = require("../firebase");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var rssLandingPages_http_module_1 = require("./rssLandingPages.http.module");
var rssLandingPages_filter_1 = require("./rssLandingPages.filter");
var log = console.log;
var entities = require("entities");
var RssLandingPages = /** @class */ (function() {
    function RssLandingPages() {
        this.init();
    }
    RssLandingPages.prototype.init = function() {
        this.config = new rssLandingPages_config_1.default();
        this.rssEndPointsDb = _firebaseDB_1.FireBaseMainDB.collection('rssEndPoints');
        this.rssFeedsDb = _firebaseDB_1.FireBaseMainDB.collection('rssFeeds');
        this.manualFeedsDb = _firebaseDB_1.FireBaseMainDB.collection('manualFeeds');
        this.manualFeedEndPointsDb = _firebaseDB_1.FireBaseMainDB.collection('manualFeedEndPoints');
        this.customFilter = new rssLandingPages_filter_1.default({ placeHolder: "*" });
    };
    RssLandingPages.prototype.addSiteToEndPoints = function(siteName) {
        var _this = this;
        return this.config.getRssSiteByName$(siteName)
            .pipe(operators_1.switchMap(function(siteConfig) {
                var data = {};
                data[siteConfig['name']] = siteConfig;
                return _this.rssEndPointsDb.doc('allEndPoints').update(data);
            }));
    };
    RssLandingPages.prototype.updateAllEndPoints = function() {
        var _this = this;
        return this.config.getRssSites$()
            .pipe(operators_1.mergeMap(function(sitesConfig) { return rxjs_1.forkJoin(sitesConfig.map(function(site) { return _this.saveRssEndPointToDb(site); })); }));
    };
    RssLandingPages.prototype.getAllRssFeeds = function() {
        return this.config.getRssSites$();
    };
    RssLandingPages.prototype.parseAndLoadSiteFeedsToDB = function(site, storyCount) {
        var _this = this;
        if (storyCount === void 0) { storyCount = 8; }
        return rxjs_1.of(site)
            .pipe(operators_1.mergeMap(function(site) { return rxjs_1.forkJoin(site.endpoints.map(function(endpoint) { return _this.parseRssFeed(site.site, endpoint, storyCount); })); }));
    };
    RssLandingPages.prototype.getEndPoint = function(sitename, endpoint) {
        return this.config.getRssSiteEndPoint$(sitename, endpoint);
    };
    RssLandingPages.prototype.getRssFeed = function(feedUrl) {
        return rssLandingPages_http_module_1.default.getRssFeed(feedUrl);
    };
    RssLandingPages.prototype.parseRssFeed = function(siteName, feed, storyCount) {
        var _this = this;
        if (storyCount === void 0) { storyCount = 8; }
        return this.getRssFeed(feed.link)
            .pipe(operators_1.map(function(res) { return res.items; }), operators_1.map(function(stories) {
                var cleanedStories = [];
                stories.map(function(story) {
                    if (cleanedStories.length === storyCount)
                        return;
                    var cleanTitleAndDescription = _this.filterWords(story.title, story.description);
                    if (!cleanTitleAndDescription.clean || story.media[0].url === '')
                        return;
                    cleanedStories.push({
                        title: cleanTitleAndDescription.title,
                        date: story.date,
                        storyLink: story.link,
                        imageLink: story.media[0].url,
                        description: cleanTitleAndDescription.description
                    });
                });
                return cleanedStories;
            }), operators_1.tap(function() { return console.log("Site", siteName, "Vertical", feed.endPoint); }), operators_1.switchMap(function(stories) { return _this.saveRssFeedToDb(siteName, feed.endPoint, stories); }));
    };
    RssLandingPages.prototype.saveRssFeedToDb = function(site, vertical, stories) {
        return this.rssFeedsDb.doc(site)
            .collection(vertical).doc('stories').set({ stories: stories });
    };
    RssLandingPages.prototype.parseRssFeedByLinkTag = function(feed, storyCount) {
        var _this = this;
        if (storyCount === void 0) { storyCount = 8; }
        var regex = /\/suburbs\/(germantown)\/|\/suburbs\/(collierville)\//;
        var items = feed.items;
        var germantown = [];
        var collierville = [];
        items.map(function(story) {
            var capture = story.guid.match(regex);
            if (capture === null)
                return;
            var captureGroup = capture[1] === undefined ? 2 : 1;
            var cleanTitleAndDescription = _this.filterWords(story.title, story.description);
            if (!cleanTitleAndDescription.clean)
                return;
            if (captureGroup === 1) {
                if (germantown.length === storyCount)
                    return;
                germantown.push({
                    title: cleanTitleAndDescription.title,
                    date: story.date,
                    storyLink: story.link,
                    imageLink: story.media[0].url,
                    description: cleanTitleAndDescription.description
                });
            } else {
                if (collierville.length === storyCount)
                    return;
                collierville.push({
                    title: cleanTitleAndDescription.title,
                    date: story.date,
                    storyLink: story.link,
                    imageLink: story.media[0].url,
                    description: cleanTitleAndDescription.description
                });
            }
        });
        return rxjs_1.of({ collierville: collierville, germantown: germantown });
    };
    RssLandingPages.prototype.filterWords = function(title, description) {
        var wordsFilteredReg = /\*\*\*+/gm;
        var verifiedTitle = this.customFilter.clean(title);
        if (verifiedTitle.match(wordsFilteredReg) !== null)
            return { clean: false };
        var CLEAN_TITLE = entities.decodeHTML(verifiedTitle.replace(/\&pos;/gm, '"'));
        var descrReg = /^(.*?)</;
        var trimmedDescription = description.match(descrReg);
        var verifiedDescription = this.customFilter.clean(trimmedDescription[1]);
        if (verifiedDescription.match(wordsFilteredReg) !== null)
            return { clean: false };
        var htmlEntititeStrippedDesciption = entities.decodeHTML(verifiedDescription);
        var CLEAN_DESCRIPTION = this.cutStringToLength(htmlEntititeStrippedDesciption.replace(/\&pos;/gm, "'"), 97);
        return { clean: true, title: CLEAN_TITLE, description: CLEAN_DESCRIPTION };
    };
    RssLandingPages.prototype.saveRssEndPointToDb = function(siteConfig) {
        var data = {};
        data[siteConfig['name']] = siteConfig;
        return this.rssEndPointsDb.doc('allEndPoints').update(data);
    };
    RssLandingPages.prototype.decodeAndTrim = function(str, lgth) {
        var descriptionRegex = /^(.*?)</;
        if (str === '')
            return;
        var description = str.match(descriptionRegex);
        var decoded = this.decodeHtmlEntity(description[1]);
        var trimmed = this.cutStringToLength(decoded, lgth);
        return trimmed;
    };
    RssLandingPages.prototype.decodeHtmlEntity = function(str) {
        return str.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        });
    };;
    RssLandingPages.prototype.cutStringToLength = function(str, lgth) {
        if (str.length > lgth) {
            var newStr = void 0;
            if (str.charCodeAt(lgth) !== 32) {
                var cutStr = str.slice(0, lgth);
                var idx = cutStr.lastIndexOf(" ");
                newStr = cutStr.substring(0, idx);
                return newStr.trim();
            }
            newStr = str.slice(0, lgth).trim();
            return newStr;
        }
        return str;
    };
    return RssLandingPages;
}());
exports.default = RssLandingPages;
//# sourceMappingURL=rssLandingPages.module.js.map