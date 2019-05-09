"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var stream_1 = require("stream");
var path = require("path");
var dataDir = path.join(process.cwd(), '_data');
function saveToFile(fileName, jsonData) {
    var outfile = path.join(dataDir, fileName);
    var data = JSON.stringify(jsonData, null, 4);
    var readable = new stream_1.Readable({
        read: function () { }
    });
    readable.push(data);
    var writer = fs.createWriteStream(fileName);
    readable.pipe(writer);
}
exports.saveToFile = saveToFile;
//# sourceMappingURL=saveToFile.util.js.map