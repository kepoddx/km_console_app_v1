import * as path from 'path';
import * as fs from 'fs';
import * as Datastore from 'nedb';
import { Observable } from 'rxjs';

// const dbPath = path.join(__dirname, 'app.db');
const dbBasePath = __dirname;


export default class DbLocal {
    private db:any;
    private basePath:fs.PathLike;

    constructor(dbFileName:string) {
        this.basePath = dbBasePath;
        const dbPath = path.join(this.basePath, dbFileName);
        this.db = new Datastore({ filename: dbPath, autoload: true})
    }
    insert(dataObj:any):Observable<any> {
        return Observable.create(observer => {
            this.db.insert(dataObj, (err, newDoc) => {
                if(err) {
                    observer.next(err)
                    observer.complete()
                } else {
                    observer.next(newDoc)
                    observer.complete()
                }
            })
        })
    }

    get(objKey:any):Observable<any> {
        return Observable.create(observer => {
            this.db.findOne(objKey, (err, newDoc) => {
                if(err) {
                    observer.next(err)
                    observer.complete()
                } else {
                    observer.next(newDoc)
                    observer.complete()
                }
            })
        })        
    }

    getAll(objKey:any):Observable<any> {
        return Observable.create(observer => {
            this.db.find(objKey, (err, newDoc) => {
                if(err) {
                    observer.next(err)
                    observer.complete()
                } else {
                    observer.next(newDoc)
                    observer.complete()
                }
            })
        })        
    }
}
