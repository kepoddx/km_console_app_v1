"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var facebook_audience_module_1 = require("./facebook.audience.module");
var Facebook = /** @class */ (function () {
    function Facebook(config) {
        this.initConfig(config);
    }
    Facebook.prototype.initConfig = function (config) {
        this._config = new rxjs_1.BehaviorSubject(config || {});
        this.audience = new facebook_audience_module_1.default();
    };
    Object.defineProperty(Facebook.prototype, "config", {
        get: function () {
            return this._config.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Facebook.prototype.updateConfig = function (updateData) {
        var currentConfig = this._config.value;
        var newConfig = Object.assign({}, this._config, updateData);
    };
    return Facebook;
}());
exports.default = new Facebook({});
//# sourceMappingURL=facebook.module.js.map