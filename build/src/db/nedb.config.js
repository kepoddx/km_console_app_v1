"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var Datastore = require("nedb");
var rxjs_1 = require("rxjs");
// const dbPath = path.join(__dirname, 'app.db');
var dbBasePath = __dirname;
var DbLocal = /** @class */ (function () {
    function DbLocal(dbFileName) {
        this.basePath = dbBasePath;
        var dbPath = path.join(this.basePath, dbFileName);
        this.db = new Datastore({ filename: dbPath, autoload: true });
    }
    DbLocal.prototype.insert = function (dataObj) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.db.insert(dataObj, function (err, newDoc) {
                if (err) {
                    observer.next(err);
                    observer.complete();
                }
                else {
                    observer.next(newDoc);
                    observer.complete();
                }
            });
        });
    };
    DbLocal.prototype.get = function (objKey) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.db.findOne(objKey, function (err, newDoc) {
                if (err) {
                    observer.next(err);
                    observer.complete();
                }
                else {
                    observer.next(newDoc);
                    observer.complete();
                }
            });
        });
    };
    DbLocal.prototype.getAll = function (objKey) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.db.find(objKey, function (err, newDoc) {
                if (err) {
                    observer.next(err);
                    observer.complete();
                }
                else {
                    observer.next(newDoc);
                    observer.complete();
                }
            });
        });
    };
    return DbLocal;
}());
exports.default = DbLocal;
//# sourceMappingURL=nedb.config.js.map