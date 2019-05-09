import { from,  of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import Http from './facebook.http.module'
import { getFbConfigFile } from './facebook.config';
import DbLocal  from '@db';

const fbConfig = getFbConfigFile();

export default class FacebookAudience {
    private http;
    private db;

    constructor() {
        this.http = new Http({
            baseURL: fbConfig.baseURL,
            defaults: [
                { key: 'access_token', value: fbConfig.adsManagerAccessToken}
            ]
        });
        this.db = DbLocal;
    }
    createAudience$(account_id, config){
        const params = Object.assign({}, config)
        return from(this.http.post(`${account_id}/customaudiences`, null, { params: params })) 
            .pipe(
                map( (res:any) => res.data),
                catchError(err => of({status: err.response.status, data: err.response.data, headers: err.response.headers}))
            )
    }
}