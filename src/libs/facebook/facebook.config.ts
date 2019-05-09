import { of, Observable } from 'rxjs'

const accountConfig = require('./data/clean/facebook.config.json')

export function getFbConfigFile() {
    return accountConfig
}
export function getFbConfig$(): Observable<any> {
    return of(accountConfig)
}