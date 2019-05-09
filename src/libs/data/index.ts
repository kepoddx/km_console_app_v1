import * as path from 'path';
import * as fs from 'fs';

import { of, bindCallback } from 'rxjs';

const dataDir = path.join(process.cwd(), '_data');
const outputDir = path.join(process.cwd(), '_output');

const readdir$ = bindCallback(fs.readdir)

export function listFiles(dirName:string) {
    const dirPath = path.join(dataDir, dirName)
    return readdir$(dirPath)
}
