"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var rxjs_1 = require("rxjs");
function getCleanJsonFile(fileName) {
    var file = path.join(__dirname, 'data', 'clean', fileName + ".json");
    var data = require(file);
    return rxjs_1.of(data);
}
exports.getCleanJsonFile = getCleanJsonFile;
//# sourceMappingURL=facebook.utils.js.map