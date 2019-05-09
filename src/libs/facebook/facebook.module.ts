import { BehaviorSubject, Observable } from "rxjs";

import FacebookAudience from './facebook.audience.module';

 class Facebook {
    private _config: BehaviorSubject<any>;
    private audience: FacebookAudience;
   
    constructor(config?:any) {
        this.initConfig(config)
    }

    initConfig(config?:any):void {
        this._config = new BehaviorSubject(config || {});
        this.audience = new FacebookAudience()
    }

    get config():Observable<any> {
        return this._config.asObservable()
    }

    updateConfig(updateData:any):void {
       const currentConfig = this._config.value
       const newConfig = Object.assign({}, this._config, updateData)
    }
}

export default new Facebook({})

