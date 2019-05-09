"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var csvjson = require("csvjson");
var rxjs_1 = require("rxjs");
var lpDataDir = path.join(process.cwd(), '_data', 'landingPageContent');
function mkFilePath(dirPath, fileName) {
    return path.join(dirPath, fileName);
}
var options = {
    delimiter: ',',
    quote: '"'
};
var readFile$ = rxjs_1.bindCallback(fs.readFileSync);
function parseContentFile(fileName) {
    var file = mkFilePath(lpDataDir, fileName);
    var data = fs.readFileSync(file, { encoding: 'utf8' });
    var json = csvjson.toObject(data, options);
    return rxjs_1.of(json);
}
exports.parseContentFile = parseContentFile;
//# sourceMappingURL=csvtojson.util.js.map