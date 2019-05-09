import * as fs from 'fs'
import { Readable } from 'stream'
import * as path from 'path'

const dataDir = path.join(process.cwd(), '_data')

export function saveToFile(fileName: string, jsonData: any) {
  const outfile = path.join(dataDir, fileName)
  const data = JSON.stringify(jsonData, null, 4)
  const readable = new Readable({
    read() { }
  })
  readable.push(data)
  const writer = fs.createWriteStream(fileName)
  readable.pipe(writer)
}