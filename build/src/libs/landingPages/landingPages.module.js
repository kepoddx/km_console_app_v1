"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _firebaseDB_1 = require("../../../libs/firebase/index");
var rssLandingPages_module_1 = require("./rssLandingPages.module");
var campagins = {
    landingPages: 'landingPagesManual'
};
var LandingPages = /** @class */ (function () {
    function LandingPages() {
        this.init();
    }
    LandingPages.prototype.init = function () {
        this.db = _firebaseDB_1.FireBaseMainDB;
        this.rss = new rssLandingPages_module_1.default();
    };
    LandingPages.prototype.getCampaignData = function (campaignName) {
        return this.db.collection(campagins.landingPages).doc(campaignName);
    };
    return LandingPages;
}());
exports.default = LandingPages;
//# sourceMappingURL=landingPages.module.js.map