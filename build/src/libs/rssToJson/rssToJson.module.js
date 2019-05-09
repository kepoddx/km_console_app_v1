"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var xml2js = require('xml2js');
var RSSparser_module_1 = require("./RSSparser.module");
var rssAxios = axios.create();
var RssFeed = /** @class */ (function () {
    /**
     * @param {Object} options
     */
    function RssFeed(options) {
        if (options === void 0) { options = {}; }
        console.log("Defaults", axios.defaults);
        this.client = rssAxios;
        this.options = options;
        this.xmlParser = new xml2js.Parser({ trim: false, normalize: true, mergeAttrs: true });
    }
    Object.defineProperty(RssFeed.prototype, "options", {
        /**
         * @returns {Object}
         */
        get: function () {
            return this._options || {
                timeout: 540000,
                count: null,
                headers: {}
            };
        },
        /**
         * @param {Object} options
         */
        set: function (options) {
            this._options = Object.assign({}, this.options, options);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {String} url
     * @param {Object} options
     * @returns {Promise}
     */
    RssFeed.prototype.load = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.options = options;
        return this.sendRequest(url)
            .then(function (response) {
            return _this.parseXmlToJson(response.data);
        }).then(function (json) {
            return _this.parseFeed(json);
        });
    };
    /**
     * @param {String} url
     * @returns {Promise}
     */
    RssFeed.prototype.sendRequest = function (url) {
        this.options.headers = Object.assign({}, this.options.headers, {
            Accept: 'application/rss+xml'
        });
        return this.client.get(url, this.options);
    };
    /**
     * @param {String} xml
     * @returns {Promise}
     */
    RssFeed.prototype.parseXmlToJson = function (xml) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var escaped = xml.replace(/\s&\s/g, ' &amp; ');
            _this.xmlParser.parseString(escaped, function (error, json) {
                if (error) {
                    // tslint:disable-next-line: no-void-expression
                    return reject(error);
                }
                // tslint:disable-next-line: no-void-expression
                return resolve(json);
            });
        });
    };
    /**
     * @param {Object} data
     * @returns {Promise}
     */
    RssFeed.prototype.parseFeed = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (data.rss) {
                var rssParser = new RSSparser_module_1.default(_this.options);
                // tslint:disable-next-line: no-void-expression
                return resolve(rssParser.parse(data.rss.channel[0]));
            }
            // tslint:disable-next-line: no-void-expression
            return reject(new Error('Unknown feed type'));
        });
    };
    Object.defineProperty(RssFeed.prototype, "client", {
        /**
         *
         * @return {axios}
         */
        get: function () {
            return this._client;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._client = value;
        },
        enumerable: true,
        configurable: true
    });
    return RssFeed;
}());
exports.default = RssFeed;
//# sourceMappingURL=rssToJson.module.js.map