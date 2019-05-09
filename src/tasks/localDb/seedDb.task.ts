import  DbLocal  from '@db';
import { Observable } from 'rxjs';


export function tSeedDb(fileName:string, data:any):Observable<any> {
    const db = new DbLocal(fileName);
    return db.insert(data)
}