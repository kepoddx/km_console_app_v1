"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localList = require('./rssLandingPagesFilter.filter.json').words;
var WordFilter = /** @class */ (function () {
    function WordFilter(config) {
        this.list = config.emptyList && [] || Array.prototype.concat.apply(localList, [config.list || []]),
            this.exclude = config.exclude || [],
            this.placeHolder = config.placeHolder || '*',
            this.regex = config.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
            this.replaceRegex = config.replaceRegex || /\w/g;
    }
    WordFilter.prototype.init = function (config) {
    };
    /**
    * Determine if a string contains profane language.
    * @param {string} string - String to evaluate for profanity.
    */
    WordFilter.prototype.isProfane = function (string) {
        var _this = this;
        return this.list
            .filter(function (word) {
            var wordExp = new RegExp("\\b" + word.replace(/(\W)/g, '\\$1') + "\\b", 'gi');
            return !_this.exclude.includes(word.toLowerCase()) && wordExp.test(string);
        })
            .length > 0 || false;
    };
    /**
    * Replace a word with placeHolder characters;
    * @param {string} string - String to replace.
    */
    WordFilter.prototype.replaceWord = function (string) {
        return string
            .replace(this.regex, '')
            .replace(this.replaceRegex, this.placeHolder);
    };
    /**
    * Evaluate a string for profanity and return an edited version.
    * @param {string} string - Sentence to filter.
    */
    WordFilter.prototype.clean = function (string) {
        var _this = this;
        return string.split(/\b/).map(function (word) {
            return _this.isProfane(word) ? _this.replaceWord(word) : word;
        }).join('');
    };
    /**
    * Add word(s) to blacklist filter / remove words from whitelist filter
    * @param {...string} word - Word(s) to add to blacklist
    */
    WordFilter.prototype.addWords = function () {
        var _this = this;
        var _a;
        var words = Array.from(arguments);
        (_a = this.list).push.apply(_a, words);
        words
            .map(function (word) { return word.toLowerCase(); })
            .forEach(function (word) {
            if (_this.exclude.includes(word)) {
                _this.exclude.splice(_this.exclude.indexOf(word), 1);
            }
        });
    };
    /**
    * Add words to whitelist filter
    * @param {...string} word - Word(s) to add to whitelist.
    */
    WordFilter.prototype.removeWords = function () {
        var _a;
        (_a = this.exclude).push.apply(_a, Array.from(arguments).map(function (word) { return word.toLowerCase(); }));
    };
    return WordFilter;
}());
exports.default = WordFilter;
//# sourceMappingURL=rssLandingPages.filter.js.map