import Axios, { AxiosInstance } from 'axios'
import { from,  of, Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { rssToJson } from '../rssToJson/index';

export interface HttpParam {
    key:string;
    value:string;
}
export interface HttpConfig {
    baseURL:string;
    defaults: HttpParam[]
}


export default class RssHttp {
    private http: AxiosInstance
    private debug = false

    constructor(config) {
        this.http = Axios.create()
        if(config !== {}) {
            this.http.defaults.baseURL = config.baseURL
            this.http.defaults.params = {}
            config.defaults.map(setting => this.http.defaults.params[setting.key] = setting.value)
        }
    }

    shouldDebug(val:boolean) { 
        this.debug = val;
        this.http.interceptors.request.use(function (config) {
            // Do something before request is sent
            console.log("Called", config.url, "\n")
            console.log("Params", config.params, "\n")
            console.log("Headers", config.headers, "\n")
            console.log("Data", config.data)
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });
        this.http.interceptors.response.use(function (response) {
            // Do something with response data
            console.log("Response", response)
            return response;
          }, function (error) {
            // Do something with response error
            return Promise.reject(error);
          });
    }
    static getRssFeed(feedurl:string):Observable<any> {
        return rssToJson(feedurl)
    }
}