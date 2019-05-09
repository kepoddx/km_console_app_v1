"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var facebook_http_module_1 = require("./facebook.http.module");
var facebook_config_1 = require("./facebook.config");
var _db_1 = require("../../db/index");
var fbConfig = facebook_config_1.getFbConfigFile();
var FacebookAudience = /** @class */ (function() {
    function FacebookAudience() {
        this.http = new facebook_http_module_1.default({
            baseURL: fbConfig.baseURL,
            defaults: [
                { key: 'access_token', value: fbConfig.adsManagerAccessToken }
            ]
        });
        this.db = _db_1.default;
    }
    FacebookAudience.prototype.createAudience$ = function(account_id, config) {
        var params = Object.assign({}, config);
        return rxjs_1.from(this.http.post(account_id + "/customaudiences", null, { params: params }))
            .pipe(operators_1.map(function(res) { return res.data; }), operators_1.catchError(function(err) { return rxjs_1.of({ status: err.response.status, data: err.response.data, headers: err.response.headers }); }));
    };
    return FacebookAudience;
}());
exports.default = FacebookAudience;
//# sourceMappingURL=facebook.audience.module.js.map