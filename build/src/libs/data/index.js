"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var rxjs_1 = require("rxjs");
var dataDir = path.join(process.cwd(), '_data');
var outputDir = path.join(process.cwd(), '_output');
var readdir$ = rxjs_1.bindCallback(fs.readdir);
function listFiles(dirName) {
    var dirPath = path.join(dataDir, dirName);
    return readdir$(dirPath);
}
exports.listFiles = listFiles;
//# sourceMappingURL=index.js.map