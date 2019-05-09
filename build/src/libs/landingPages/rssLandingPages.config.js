"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var sitesMap = {
    "asheville": {
        "feedUrl": "http://static.citizen-times.com/rss/",
        urls: {
            "sports": "http://rssfeeds.citizen-times.com/asheville/sports&x=1",
            "localNews": "http://rssfeeds.citizen-times.com/asheville/local&x=1",
            "highSchoolSports": "",
            "entertainment": "http://rssfeeds.citizen-times.com/asheville/scene&x=1",
        },
        liveUrls: {
            "sports": "http://rssfeeds.citizen-times.com/asheville/sports&x=1",
            "entertainment": "http://rssfeeds.citizen-times.com/asheville/scene&x=1",
        }
    },
    "cherryHill": {
        "feedUrl": "http://static.courierpostonline.com/rss/",
        urls: {
            "entertainment": "http://rssfeeds.courierpostonline.com/cherryhill/entertainment&x=1",
            "localNews": "http://rssfeeds.courierpostonline.com/cherryhill/localnews&x=1",
            "eagles": "http://rssfeeds.courierpostonline.com/cherryhill/eagles&x=1",
            "flyers": "http://rssfeeds.courierpostonline.com/cherryhill/flyers&x=1",
            "phillies": "http://rssfeeds.courierpostonline.com/cherryhill/phillies&x=1",
            "sixers": "http://rssfeeds.courierpostonline.com/cherryhill/sixers&x=1",
            "varsity": "http://rssfeeds.courierpostonline.com/cherryhill/varsity&x=1",
        },
        liveUrls: {
            "entertainment": "http://rssfeeds.courierpostonline.com/cherryhill/entertainment&x=1",
            "localNews": "http://rssfeeds.courierpostonline.com/cherryhill/localnews&x=1",
        }
    },
    "evansville": {
        "feedUrl": "http://static.courierpress.com/rss/",
        urls: {
            "highSchoolSports": "http://rssfeeds.courierpress.com/courierpress/sports/highschool&x=1",
            "otters": "http://rssfeeds.courierpress.com/courierpress/sports/otters&x=1",
            "ueSports": "http://rssfeeds.courierpress.com/courierpress/sports/uesports&x=1",
            "thunderbolts": "http://rssfeeds.courierpress.com/courierpress/sports/thunderbolts&x=1",
            "pacers": "http://rssfeeds.courierpress.com/courierpress/sports/pacers&x=1",
            "colts": "http://rssfeeds.courierpress.com/courierpress/sports/colts&x=1",
            "hoosiers": "http://rssfeeds.courierpress.com/courierpress/sports/hoosiers&x=1",
            "foodAndDining": "http://rssfeeds.courierpress.com/courierpress/features/fooddining&x=1",
            "artsAndCulture": "http://rssfeeds.courierpress.com/courierpress/features/artsculture&x=1",
            "healtAndFitness": "http://rssfeeds.courierpress.com/courierpress/features/healthfitness&x=1",
            "makingTheGrade": "http://rssfeeds.courierpress.com/courierpress/news/makingthegrade&x=1",
        },
        liveUrls: {
            "highSchoolSports": "http://rssfeeds.courierpress.com/courierpress/sports/highschool&x=1",
            "foodAndDining": "http://rssfeeds.courierpress.com/courierpress/features/fooddining&x=1",
            "artsAndCulture": "http://rssfeeds.courierpress.com/courierpress/features/artsculture&x=1",
            "pacers": "http://rssfeeds.courierpress.com/courierpress/sports/pacers&x=1",
            "colts": "http://rssfeeds.courierpress.com/courierpress/sports/colts&x=1",
        },
    },
    "packersNews": {
        "feedUrl": "http://static.packersnews.com/rss/",
        urls: {
            "packers": "http://rssfeeds.packersnews.com/packersnews/home&x=1"
        },
        liveUrls: {
            "packers": "http://rssfeeds.packersnews.com/packersnews/home&x=1"
        },
    }
};
var sites = [{
        name: "asheville",
        feedUrl: "http://static.citizen-times.com/rss/",
        endPoints: [
            { endPoint: "sports", link: "http://rssfeeds.citizen-times.com/asheville/sports&x=1" },
            { endPoint: "localNews", link: "http://rssfeeds.citizen-times.com/asheville/local&x=1" },
            { endPoint: "highSchoolSports", link: "" },
            { endPoint: "entertainment", link: "http://rssfeeds.citizen-times.com/asheville/scene&x=1" },
        ],
        liveEndPoints: [
            { endPoint: "sports", link: "http://rssfeeds.citizen-times.com/asheville/sports&x=1" },
            { endPoint: "entertainment", link: "http://rssfeeds.citizen-times.com/asheville/scene&x=1" },
        ]
    },
    {
        name: "cherryHill",
        feedUrl: "http://static.courierpostonline.com/rss/",
        endPoints: [
            { endPoint: "entertainment", link: "http://rssfeeds.courierpostonline.com/cherryhill/entertainment&x=1" },
            { endPoint: "localNews", link: "http://rssfeeds.courierpostonline.com/cherryhill/localnews&x=1" },
            { endPoint: "eagles", link: "http://rssfeeds.courierpostonline.com/cherryhill/eagles&x=1" },
            { endPoint: "flyers", link: "http://rssfeeds.courierpostonline.com/cherryhill/flyers&x=1" },
            { endPoint: "phillies", link: "http://rssfeeds.courierpostonline.com/cherryhill/phillies&x=1" },
            { endPoint: "sixers", link: "http://rssfeeds.courierpostonline.com/cherryhill/sixers&x=1" },
            { endPoint: "varsity", link: "http://rssfeeds.courierpostonline.com/cherryhill/varsity&x=1" },
        ],
        liveEndPoints: [
            { endPoint: "entertainment", link: "http://rssfeeds.courierpostonline.com/cherryhill/entertainment&x=1" },
            { endPoint: "localNews", link: "http://rssfeeds.courierpostonline.com/cherryhill/localnews&x=1" },
        ]
    },
    {
        name: "evansville",
        feedUrl: "http://static.courierpress.com/rss/",
        endPoints: [
            { endPoint: "otters", link: "http://rssfeeds.courierpress.com/courierpress/sports/otters&x=1" },
            { endPoint: "ueSports", link: "http://rssfeeds.courierpress.com/courierpress/sports/uesports&x=1" },
            { endPoint: "thunderbolts", link: "http://rssfeeds.courierpress.com/courierpress/sports/thunderbolts&x=1" },
            { endPoint: "hoosiers", link: "http://rssfeeds.courierpress.com/courierpress/sports/hoosiers&x=1" },
            { endPoint: "highSchoolSports", link: "http://rssfeeds.courierpress.com/courierpress/sports/highschool&x=1" },
            { endPoint: "foodAndDining", link: "http://rssfeeds.courierpress.com/courierpress/features/fooddining&x=1" },
            { endPoint: "artsAndCulture", link: "http://rssfeeds.courierpress.com/courierpress/features/artsculture&x=1" },
            { endPoint: "pacers", link: "http://rssfeeds.courierpress.com/courierpress/sports/pacers&x=1" },
            { endPoint: "colts", link: "http://rssfeeds.courierpress.com/courierpress/sports/colts&x=1" },
            { endPoint: "healtAndFitness", link: "http://rssfeeds.courierpress.com/courierpress/features/healthfitness&x=1" },
            { endPoint: "makingTheGrade", link: "http://rssfeeds.courierpress.com/courierpress/news/makingthegrade&x=1" },
        ],
        liveEndPoints: [
            { endPoint: "highSchoolSports", link: "http://rssfeeds.courierpress.com/courierpress/sports/highschool&x=1" },
            { endPoint: "foodAndDining", link: "http://rssfeeds.courierpress.com/courierpress/features/fooddining&x=1" },
            { endPoint: "artsAndCulture", link: "http://rssfeeds.courierpress.com/courierpress/features/artsculture&x=1" },
            { endPoint: "pacers", link: "http://rssfeeds.courierpress.com/courierpress/sports/pacers&x=1" },
            { endPoint: "colts", link: "http://rssfeeds.courierpress.com/courierpress/sports/colts&x=1" },
        ]
    },
    {
        name: "packersNews",
        feedUrl: "http://static.packersnews.com/rss/",
        endPoints: [
            { endPoint: "packers", link: "http://rssfeeds.packersnews.com/packersnews/home&x=1" }
        ],
        liveEndPoints: [
            { endPoint: "packers", link: "http://rssfeeds.packersnews.com/packersnews/home&x=1" }
        ]
    },
    {
        name: "memphis",
        feedUrl: "http://static.commercialappeal.com/rss/",
        endPoints: [
            { endPoint: "the901", link: "http://rssfeeds.commercialappeal.com/memphis/the-901&x=1" },
            { endPoint: "sports", link: "http://rssfeeds.commercialappeal.com/memphis/sports&x=1" },
            { endPoint: "redbirds", link: "http://rssfeeds.commercialappeal.com/memphis/redbirds&x=1" },
            { endPoint: "entertainment", link: "http://rssfeeds.commercialappeal.com/memphis/entertainment&x=1" },
            { endPoint: "music", link: "http://rssfeeds.feedblitz.com/memphis/music&x=1" },
            { endPoint: "movies", link: "http://rssfeeds.commercialappeal.com/memphis/movies&x=1" },
            { endPoint: "arts", link: "http://rssfeeds.commercialappeal.com/memphis/arts&x=1" },
            { endPoint: "suburbs", link: "http://rssfeeds.commercialappeal.com/memphis/suburbs&x=1" },
            { endPoint: "preps", link: "http://rssfeeds.commercialappeal.com/memphis/preps&x=1" },
            { endPoint: "festivals", link: "http://rssfeeds.commercialappeal.com/memphis/festivals" },
            { endPoint: "tigers", link: "http://rssfeeds.commercialappeal.com/memphis/tigers&x=1" },
            { endPoint: "grizzlies", link: "http://rssfeeds.commercialappeal.com/memphis/grizzlies&x=1" },
            { endPoint: "food", link: "http://rssfeeds.commercialappeal.com/memphis/food&x=1" },
        ],
        liveEndPoints: [
            { endPoint: "suburbs", link: "http://rssfeeds.commercialappeal.com/memphis/suburbs&x=1" },
            { endPoint: "preps", link: "http://rssfeeds.commercialappeal.com/memphis/preps&x=1" },
            { endPoint: "tigers", link: "http://rssfeeds.commercialappeal.com/memphis/tigers&x=1" },
            { endPoint: "grizzlies", link: "http://rssfeeds.commercialappeal.com/memphis/grizzlies&x=1" },
            { endPoint: "food", link: "http://rssfeeds.commercialappeal.com/memphis/food&x=1" },
        ]
    },
    {
        name: "fortCollins",
        feedUrl: "http://static.coloradoan.com/rss/",
        endPoints: [
            { endPoint: "sports", link: "http://rssfeeds.coloradoan.com/fortcollins/sports&x=1" },
            { endPoint: "entertainment", link: "http://rssfeeds.coloradoan.com/fortcollins/entertainment&x=1" },
        ],
        liveEndPoints: [
            { endPoint: "sports", link: "http://rssfeeds.coloradoan.com/fortcollins/sports&x=1" },
            { endPoint: "entertainment", link: "http://rssfeeds.coloradoan.com/fortcollins/entertainment&x=1" },
        ]
    },
    {
        name: "siouxFalls",
        feedUrl: "http://static.argusleader.com/rss/",
        endPoints: [
            { endPoint: "sports", link: "http://rssfeeds.argusleader.com/siouxfalls/sports&x=1" },
            { endPoint: "entertainment", link: "" },
        ],
        liveEndPoints: [
            { endPoint: "sports", link: "http://rssfeeds.argusleader.com/siouxfalls/sports&x=1" },
        ]
    },
    {
        name: "ventura",
        feedUrl: "http://static.vcstar.com/rss/",
        endPoints: [
            { endPoint: "sports", link: "http://rssfeeds.vcstar.com/ventura-county/sports&x=1" },
            { endPoint: "entertainment", link: "http://rssfeeds.vcstar.com/ventura-county/entertainment&x=1" },
        ],
        liveEndPoints: [
            { endPoint: "sports", link: "http://rssfeeds.vcstar.com/ventura-county/sports&x=1" },
            { endPoint: "entertainment", link: "http://rssfeeds.vcstar.com/ventura-county/entertainment&x=1" },
        ]
    },
    {
        name: "jacksonms",
        feedUrl: 'http://static.clarionledger.com/rss/',
        endPoints: [
            { endPoint: "sports", link: "http://rssfeeds.clarionledger.com/jacksonms/sports&x=1" },
            { endPoint: "mississippiState", link: "http://rssfeeds.clarionledger.com/jacksonms/mississippistate&x=1" },
            { endPoint: "oleMiss", link: "http://rssfeeds.clarionledger.com/jacksonms/olemiss&x=1" },
            { endPoint: "southernMis", link: "http://rssfeeds.clarionledger.com/jacksonms/southernmiss&x=1" },
            { endPoint: "prepSports", link: "http://rssfeeds.clarionledger.com/jacksonms/highschoolsports&x=1" },
        ],
        liveEndPoints: [
            { endPoint: "sports", link: "http://rssfeeds.clarionledger.com/jacksonms/sports&x=1" },
            { endPoint: "mississippiState", link: "http://rssfeeds.clarionledger.com/jacksonms/mississippistate&x=1" },
            { endPoint: "oleMiss", link: "http://rssfeeds.clarionledger.com/jacksonms/olemiss&x=1" },
            { endPoint: "southernMis", link: "http://rssfeeds.clarionledger.com/jacksonms/southernmiss&x=1" },
            { endPoint: "prepSports", link: "http://rssfeeds.clarionledger.com/jacksonms/highschoolsports&x=1" },
        ]
    },
    {
        name: "knoxville",
        feedUrl: "http://static.knoxnews.com/rss/",
        endPoints: [
            { endPoint: "bizjournal", link: "http://rssfeeds.knoxnews.com/knoxville/business-journal/&x=1" },
            { endPoint: "goKnox", link: "http://rssfeeds.knoxnews.com/knoxville/go-knoxville&x=1" },
            { endPoint: "utSports", link: "" }
        ],
        liveEndPoints: [
            { endPoint: "bizjournal", link: "http://rssfeeds.knoxnews.com/knoxville/business-journal/&x=1" },
            { endPoint: "goKnox", link: "http://rssfeeds.knoxnews.com/knoxville/go-knoxville&x=1" },
        ]
    }
];
var RssLandingPagesConfig = /** @class */ (function() {
    function RssLandingPagesConfig() {}
    RssLandingPagesConfig.prototype.getRssSiteMap$ = function() {
        return rxjs_1.of(sitesMap);
    };
    RssLandingPagesConfig.prototype.getRssSites$ = function() {
        return rxjs_1.of(sites);
    };
    RssLandingPagesConfig.prototype.getRssSiteByName$ = function(siteName) {
        return rxjs_1.of(sites)
            .pipe(operators_1.map(function(sitesConfig) { return sitesConfig.filter(function(site) { return site.name === siteName; }); }), operators_1.map(function(siteArr) { return siteArr[0]; }));
    };
    RssLandingPagesConfig.prototype.getRssSiteEndPoint$ = function(siteName, endPoint) {
        return rxjs_1.of(sites)
            .pipe(operators_1.map(function(sitesConfig) { return sitesConfig.filter(function(site) { return site.name === siteName; }); }), operators_1.map(function(siteArr) { return siteArr[0].liveEndPoints.filter(function(endpoint) { return endpoint.endPoint === endPoint; }); }));
    };
    return RssLandingPagesConfig;
}());
exports.default = RssLandingPagesConfig;
//# sourceMappingURL=rssLandingPages.config.js.map