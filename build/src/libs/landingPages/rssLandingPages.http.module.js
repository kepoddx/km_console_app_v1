"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var index_1 = require("../rssToJson/index");
var RssHttp = /** @class */ (function () {
    function RssHttp(config) {
        var _this = this;
        this.debug = false;
        this.http = axios_1.default.create();
        if (config !== {}) {
            this.http.defaults.baseURL = config.baseURL;
            this.http.defaults.params = {};
            config.defaults.map(function (setting) { return _this.http.defaults.params[setting.key] = setting.value; });
        }
    }
    RssHttp.prototype.shouldDebug = function (val) {
        this.debug = val;
        this.http.interceptors.request.use(function (config) {
            // Do something before request is sent
            console.log("Called", config.url, "\n");
            console.log("Params", config.params, "\n");
            console.log("Headers", config.headers, "\n");
            console.log("Data", config.data);
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
        this.http.interceptors.response.use(function (response) {
            // Do something with response data
            console.log("Response", response);
            return response;
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
    };
    RssHttp.getRssFeed = function (feedurl) {
        return index_1.rssToJson(feedurl);
    };
    return RssHttp;
}());
exports.default = RssHttp;
//# sourceMappingURL=rssLandingPages.http.module.js.map