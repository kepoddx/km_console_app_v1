"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _tasks_1 = require("./tasks/index");
var _facebook_1 = require("./libs/facebook/index");
var _data_1 = require("./libs/data/index");
var _libs_1 = require("./libs/index");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var rssLandingPages_module_1 = require("./libs/landingPages/rssLandingPages.module");
var log = console.log;
/**
 * ========================================
 *  Variables To Test Declared Functions
 * ======================================== */
var APP_CHOICES = [
    { name: 'generateModule', message: 'Generate a Module' },
    { name: 'seedLocalDbFbAdAccounts', message: 'Seed NeDb Facebook Ad Accounts' }
];
var fbAccountsFile = 'fbAdAccounts';
var fbAudienceFile = 'fbAudiences';
var fbAudienceData = {
    account_id: '23843220233570182',
    listUploadDate: '3.5.19',
    audience: {
        name: 'AG Paywall Converters Exclusions 3.5.19',
        description: "Paywall Converters Exclude from Ad"
    }
};
var readDataDir = 'emailLists';
/**
 * ========================================
 *  End Variables To Test Declared Functions
 * ======================================== */
function generateModule() {
    _tasks_1.genMod()
        .subscribe(function(d) { return log(d); });
}
// seedLocalDbFbAdAccounts(fbAccountsFile)
function seedLocalDbFbAdAccounts(fileName) {
    _facebook_1.getCleanJsonFile(fileName)
        .pipe(operators_1.switchMap(function(sites) { return _tasks_1.tSeedDb(fileName, sites); }), operators_1.catchError(function(err) { return rxjs_1.of(err); }))
        .subscribe(function(r) { return log(r); });
}
// seedLocalDbFbAdAudiences(fbAudienceFile, fbAudienceData)
function seedLocalDbFbAdAudiences(fileName, data) {
    rxjs_1.of(data)
        .pipe(operators_1.switchMap(function(sites) { return _tasks_1.tSeedDb(fileName, sites); }), operators_1.catchError(function(err) { return rxjs_1.of(err); }))
        .subscribe(function(r) { return log(r); });
}
// listDataFiles(readDataDir)
function listDataFiles(dirName) {
    _data_1.listFiles(dirName)
        .pipe(operators_1.map(function(fileList) { return fileList[1]; }))
        .subscribe(function(r) { return log(r); });
}
// addRssEndpoint()
function addRssEndpoint() {
    var rss = new rssLandingPages_module_1.default();
    rss.addSiteToEndPoints('memphis')
        .subscribe(function(d) { return log(d); });
}
// updateAllEndpoints()
function updateAllEndpoints() {
    var rss = new rssLandingPages_module_1.default();
    rss.updateAllEndPoints()
        .subscribe(function(d) { return log(d); });
}

splitRssStreamByLinkTag('memphis', 'suburbs', 8);

function splitRssStreamByLinkTag(sitename, endpoint, storyCount) {
    var rss = new rssLandingPages_module_1.default();
    rss.getEndPoint(sitename, endpoint)
        .pipe(operators_1.map(function(d) { return d[0]; }), operators_1.switchMap(function(endPointConfig) { return rss.getRssFeed(endPointConfig.link); }), operators_1.switchMap(function(feedData) { return rss.parseRssFeedByLinkTag(feedData, storyCount); }), operators_1.map(function(splitStories) {
            var feeds = [];
            for (var vertical in splitStories) {
                feeds.push({ site: sitename, endPoint: vertical, stories: splitStories[vertical] });
            }
            return feeds;
        }), operators_1.mergeMap(function(feeds) { return rxjs_1.forkJoin(feeds.map(function(feed) { return rss.saveRssFeedToDb(feed.site, feed.endPoint, feed.stories); })); }))
        .subscribe(function(d) { return log(JSON.stringify(d)); });
}
// updateAllRssFeeds()
function updateAllRssFeeds(storyCount) {
    if (storyCount === void 0) { storyCount = 8; }
    var rss = new rssLandingPages_module_1.default();
    rss.getAllRssFeeds()
        .pipe(operators_1.map(function(sitesConfig) { return sitesConfig.map(function(site) { return ({ site: site.name, endpoints: site.liveEndPoints }); }); }), operators_1.mergeMap(function(sitesLiveConfg) { return rxjs_1.forkJoin(sitesLiveConfg.map(function(site) { return rss.parseAndLoadSiteFeedsToDB(site, storyCount); })); }))
        .subscribe(function(d) { return log(JSON.stringify(d)); });
}
// updateRssFeed()
function updateRssFeed(siteName, endpoint, storyCount) {
    if (storyCount === void 0) { storyCount = 8; }
    var rss = new rssLandingPages_module_1.default();
    rss.getEndPoint(siteName, endpoint)
        .pipe(operators_1.map(function(sitesConfig) { return sitesConfig.map(function(site) { return ({ site: site.name, endpoints: site.liveEndPoints }); }); }), operators_1.mergeMap(function(sitesLiveConfg) { return rxjs_1.forkJoin(sitesLiveConfg.map(function(site) { return rss.parseAndLoadSiteFeedsToDB(site, storyCount); })); }))
        .subscribe(function(d) { return log(JSON.stringify(d)); });
}
const exclusisons = [
    { site: 'memphis', endpoint: 'suburbs' },
];
updateAllRssFeedsWithExclusions(exclusisons)

function updateAllRssFeedsWithExclusions(exclusions) {
    var rss = new rssLandingPages_module_1.default();
    var exclusionMap = new Set();
    exclusions.map(function(exclusion) { return exclusionMap.add(exclusion.site + "-" + exclusion.endpoint); });
    rss.getAllRssFeeds()
        .pipe(operators_1.map(function(sitesConfig) {
            return sitesConfig.map(function(site) {
                var filteredEndpoints = site.liveEndPoints.filter(function(endpoint) { return exclusionMap.has(site.name + "-" + endpoint.endPoint) === false; });
                return { site: site.name, endpoints: filteredEndpoints };
            });
        }), operators_1.mergeMap(function(sitesLiveConfg) { return rxjs_1.forkJoin(sitesLiveConfg.map(function(site) { return rss.parseAndLoadSiteFeedsToDB(site); })); }))
        .subscribe(function(d) { return log(JSON.stringify(d)); });
}
// const landingPageRawFile = "trueCrime.csv"
// transformRawContentPageData(landingPageRawFile)
function transformRawContentPageData(fileName) {
    _libs_1.parseContentFile(fileName)
        .subscribe(function(r) {
            _libs_1.saveToFile('trueCrime.json', r);
        });
}
//# sourceMappingURL=index.js.map