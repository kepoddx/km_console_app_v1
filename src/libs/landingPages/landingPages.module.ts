import { FireBaseMainDB } from '@firebaseDB'
import RssLandingPages from './rssLandingPages.module';

const campagins = {
    landingPages: 'landingPagesManual'
}

export default class LandingPages {
    private db:firebase.firestore.Firestore;
    private rss:RssLandingPages;
    constructor() {
        this.init()
    }

    init() {
        this.db = FireBaseMainDB;
        this.rss = new RssLandingPages();
    }

    getCampaignData(campaignName:string) {
        return this.db.collection(campagins.landingPages).doc(campaignName)
    }
}
