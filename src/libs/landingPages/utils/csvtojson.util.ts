import * as path from 'path'
import * as fs from 'fs'
import * as  csvjson from 'csvjson'
import { bindCallback, from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';


const lpDataDir = path.join(process.cwd(), '_data', 'landingPageContent')

function mkFilePath(dirPath: string, fileName: string) {
  return path.join(dirPath, fileName)
}

const options = {
  delimiter: ',',
  quote: '"'
}

const readFile$ = bindCallback(fs.readFileSync)

export function parseContentFile(fileName: string) {
  const file = mkFilePath(lpDataDir, fileName);
  const data = fs.readFileSync(file, { encoding: 'utf8' })
  const json = csvjson.toObject(data, options)
  return of(json)
}