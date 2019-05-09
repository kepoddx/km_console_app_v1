import { BehaviorSubject, Observable } from "rxjs";


 class {{className}} {
    private _config: BehaviorSubject<any>;
   
    constructor(config?:any) {
        this.initConfig(config)
    }

    initConfig(config?:any):void {
        this._config = new BehaviorSubject(config || {});
    }

    get config():Observable<any> {
        return this._config.asObservable()
    }

    updateConfig(updateData:any):void {
       const currentConfig = this._config.value
       const newConfig = Object.assign({}, this._config, updateData)
    }
}

export default new {{className}}({})

