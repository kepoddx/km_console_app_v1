"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RssParser = /** @class */ (function () {
    /**
     * @param {Object} options
     */
    function RssParser(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
    }
    Object.defineProperty(RssParser.prototype, "options", {
        /**
         * @returns {Object}
         */
        get: function () {
            return this._options || {
                count: null
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
     * @param {Object} data
     * @returns {Object}
     */
    RssParser.prototype.parse = function (data) {
        var channel = this.parseChannel(data);
        channel.image = this.parseChannelImage(data);
        channel.items = this.parseItems(data);
        return channel;
    };
    /**
     * @param {Object} data
     * @returns {Object}
     */
    RssParser.prototype.parseChannel = function (data) {
        return this.extractStructure([
            'title', 'description', 'link'
        ], data);
    };
    /**
     * @param {Object} data
     * @returns {Object}
     */
    RssParser.prototype.parseChannelImage = function (data) {
        return data.image ? this.parseImage(data.image[0]) : undefined;
    };
    /**
     * @param {Object} data
     * @returns {Array}
     */
    RssParser.prototype.parseItems = function (data) {
        var _this = this;
        var source = data.item || [];
        var count = this.options.count || source.length;
        return source.slice(0, count).map(function (item) { return _this.parseItem(item); });
    };
    /**
     * @param {Object} data
     * @returns {Object}
     */
    RssParser.prototype.parseItem = function (data) {
        var _a = this.options.extraParsedItemFields, extraParsedItemFields = _a === void 0 ? [] : _a;
        var item = this.extractStructure([
            'title', 'description', 'link', { target: 'pubDate', as: 'date' }
        ].concat(extraParsedItemFields), data);
        item.guid = this.parseGuid(data);
        item.categories = this.parseCategories(data);
        item.thumbnail = this.parseThumbnail(data);
        item.media = this.parseMedia(data);
        return item;
    };
    /**
     * @param {Object} data
     * @returns {Array}
     */
    RssParser.prototype.parseCategories = function (data) {
        var _this = this;
        var categories;
        if (data['category']) {
            categories = data['category'].map(function (category) { return _this.extractValueFromObject(category); });
        }
        return categories;
    };
    /**
     * @param {Object} data
     * @returns {String}
     */
    RssParser.prototype.parseGuid = function (data) {
        var guid;
        if (data['guid']) {
            guid = this.extractValueFromObject(data['guid'][0]);
        }
        return guid;
    };
    /**
     * @param data
     * @returns {Object}
     */
    RssParser.prototype.parseThumbnail = function (data) {
        var thumbnail;
        if (data['media:thumbnail']) {
            thumbnail = this.parseImage(data['media:thumbnail'][0]);
        }
        if (data['media:group'] && data['media:group'][0]['media:thumbnail']) {
            thumbnail = this.parseImage(data['media:group'][0]['media:thumbnail'][0]);
        }
        return thumbnail;
    };
    /**
     * @param {Object} data
     * @returns {Array}
     */
    RssParser.prototype.parseMedia = function (data) {
        var _this = this;
        var media = [];
        if (data['enclosure']) {
            media = data['enclosure'];
        }
        if (data['media:content']) {
            media = data['media:content'];
        }
        if (data['media:group'] && data['media:group'][0]['media:content']) {
            media = data['media:group'][0]['media:content'];
        }
        return media.map(function (element) { return _this.parseImage(element); });
    };
    /**
     * @param {Object} data
     * @returns {Object}
     */
    RssParser.prototype.parseImage = function (data) {
        return this.extractStructure([
            'url', 'title', 'description', 'width', 'height', 'type'
        ], data);
    };
    /**
     * @param {Array} structure
     * @param {Object} data
     * @returns {Object}
     */
    RssParser.prototype.extractStructure = function (structure, data) {
        var _this = this;
        var result = {};
        structure.forEach(function (attribute) {
            var inputKey = attribute;
            var resultKey = attribute;
            if (attribute instanceof Object) {
                inputKey = attribute.target;
                resultKey = attribute.as;
            }
            result[resultKey] = _this.extractAttribute(inputKey, data);
        });
        return result;
    };
    /**
     * @param {String} attribute
     * @param {Object} input
     * @param empty
     * @returns {*}
     */
    RssParser.prototype.extractAttribute = function (attribute, input, empty) {
        return input[attribute] ? input[attribute][0] : empty;
    };
    /**
     * @param {*} input
     * @returns {String}
     */
    RssParser.prototype.extractValueFromObject = function (input) {
        if (input instanceof Object) {
            return input['_'];
        }
        return input;
    };
    return RssParser;
}());
exports.default = RssParser;
//# sourceMappingURL=RSSparser.module.js.map