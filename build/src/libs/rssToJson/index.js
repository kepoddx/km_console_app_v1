"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rssToJson_module_1 = require("./rssToJson.module");
var rxjs_1 = require("rxjs");
function rssToJson(url) {
    return rxjs_1.from(new rssToJson_module_1.default().load(url).catch(function (err) { return console.error(err.request); }));
}
exports.rssToJson = rssToJson;
//# sourceMappingURL=index.js.map