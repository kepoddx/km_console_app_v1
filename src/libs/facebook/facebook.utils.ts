import * as path from 'path';
import { of } from 'rxjs'

export function getCleanJsonFile(fileName:string) {
    const file = path.join(__dirname, 'data', 'clean', `${fileName}.json`);
    const data = require(file);
    return of(data)
}