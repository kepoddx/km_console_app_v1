import RssFeed from './rssToJson.module';
import { from, Observable, of } from "rxjs";

export function rssToJson(url: string): Observable<any> {
  return from(new RssFeed().load(url).catch((err:any) => console.error(err.request)));
}