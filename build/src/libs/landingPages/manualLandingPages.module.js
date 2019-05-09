"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var manualLandingPages_config_1 = require("./manualLandingPages.config");
var _firebaseDB_1 = require("../../../libs/firebase/index");
var ManualLandingPages = /** @class */ (function () {
    function ManualLandingPages(config) {
        this.init(config);
    }
    ManualLandingPages.prototype.init = function (config) {
        this.data = new manualLandingPages_config_1.default();
        this.manualFeedsDb = _firebaseDB_1.FireBaseMainDB.collection('manualFeeds');
        this.manualFeedEndPointsDb = _firebaseDB_1.FireBaseMainDB.collection('manualFeedEndPoints');
    };
    return ManualLandingPages;
}());
exports.default = ManualLandingPages;
//# sourceMappingURL=manualLandingPages.module.js.map