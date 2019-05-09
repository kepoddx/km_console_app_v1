import ManualLandingPagesConfig from './manualLandingPages.config'
import { FireBaseMainDB } from '@firebaseDB'


export default class ManualLandingPages {
    private data:ManualLandingPagesConfig;
    private manualFeedsDb:firebase.firestore.CollectionReference;
    private manualFeedEndPointsDb:firebase.firestore.CollectionReference;


    constructor(config:any) {
        this.init(config)
    }
    init(config:any) {
        this.data = new ManualLandingPagesConfig();
        this.manualFeedsDb = FireBaseMainDB.collection('manualFeeds')
        this.manualFeedEndPointsDb = FireBaseMainDB.collection('manualFeedEndPoints')
    }
}