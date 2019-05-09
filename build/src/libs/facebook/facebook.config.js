"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var accountConfig = require('../../../../_data/clean/facebook.config.json');

function getFbConfigFile() {
    return accountConfig;
}
exports.getFbConfigFile = getFbConfigFile;

function getFbConfig$() {
    return rxjs_1.of(accountConfig);
}
exports.getFbConfig$ = getFbConfig$;
//# sourceMappingURL=facebook.config.js.map