"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _db_1 = require("../../db");

function tSeedDb(fileName, data) {
    var db = new _db_1.default(fileName);
    return db.insert(data);
}
exports.tSeedDb = tSeedDb;
//# sourceMappingURL=seedDb.task.js.map