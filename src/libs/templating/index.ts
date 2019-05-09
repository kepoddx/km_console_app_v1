import * as fs from 'fs'
import * as path from 'path'
import { Transform } from 'stream'
import * as mustache from 'mustache'
import chalk from 'chalk'
const log = console.log

import { bindCallback, of, throwError, Observable, from, forkJoin } from 'rxjs'
import { switchMap, map, tap, mergeMap } from 'rxjs/operators';

const readdir$ = bindCallback(fs.readdir);
const mkdir$ = bindCallback((dirPath:fs.PathLike, options, callback) => fs.mkdir(dirPath, options, callback))
const stat$ = bindCallback(fs.stat)
const templatingDir = `${__dirname}`
/**
 * @param { }
 * @return - List of all templates in folder that can be used.  Folder name is the module name.
 */

export const MODULE_CHOICES = readdir$(`${templatingDir}/templates`)

const templateDir = path.join(process.cwd(), 'src', 'libs', 'templating', 'templates')
const srcDir = path.join(process.cwd(), 'src')

const hydrateTemplate = (varObj:Object) => {
    return new Transform({
        transform: (data, _, done) => {
            const hydratedData = mustache.render(data.toString(), varObj)
            done(null, hydratedData)
        }
    })  
};


export interface ModuleSelectResponse {
    moduleName: string
}

export interface ModuleBuildConfig {
    folderName:string;
    fileName:string;
    fileExt:string;
    className?:string;
}

export function genFileAndDir(moduleName:string, configObj:ModuleSelectResponse) {
    const reader = fs.createReadStream(`${templateDir}/${moduleName}/${moduleName}.tpl`)
    const writer = fs.createWriteStream(`${srcDir}/${moduleName}/${configObj.moduleName}.ts`)
    console.log("COnfig",configObj)
    writer.on('error', err => {
        log(chalk.red(err))
    })
    writer.on('finish', ()=> {
        console.log("DOne")
    })
    reader
    .pipe(hydrateTemplate(configObj))
    .pipe(writer)
}

export function copyDirAndFiles(config:ModuleBuildConfig) {
    return verifyDir(`${srcDir}/${config.folderName}`)
        .pipe(
            switchMap(res => !isError(res) ? mkdir$(`${srcDir}\\${config.folderName}\\${config.fileName}`, { recursive: true}) : of(null)),
            switchMap(() => copyFiles(`${templateDir}\\${config.folderName}`,`${srcDir}\\${config.folderName}`, config))
        )
}

export function copyFiles(fromDirPath:string, toDirPath:string, config:ModuleBuildConfig) {
    log(fromDirPath, toDirPath)
    return readdir$(fromDirPath)
        .pipe(
            map(res => res[1]),
            tap(res => log(res)),
            mergeMap((fileNames:string[]) => forkJoin(fileNames.map(fileName => fileCopyStream(fileName, fromDirPath, toDirPath, config))) )
        )
}

export function fileCopyStream(fileName:string, fromPath:string, toPath:string, config:ModuleBuildConfig){
    return Observable.create((observer) => {
        const verfiedFilName = fileName.indexOf('index') === -1 ? `${config.fileName}.${fileName.replace(/tpl/, `${config.fileExt}`)}` : `${fileName.replace(/tpl/, `${config.fileExt}`)}`
        const reader = fs.createReadStream(`${fromPath}\\${fileName}`)
        const writeTo = path.join(toPath, config.fileName, verfiedFilName)
        const writer = fs.createWriteStream(writeTo)
        writer.on('error', err => {
            observer.next(err)
            observer.complete()
        })
        writer.on('finish', ()=> {
            observer.next("Complete")
            observer.complete()
        })
        reader
        .pipe(hydrateTemplate(config))
        .pipe(writer)    
    }) 
}

export function verifyDir(dirPath:string) {
    return stat$(dirPath)
        .pipe(
            map(res => isError(res) ? false : res[1].isDirectory())
        )
}

export function isError(res) {
    return res instanceof Error
}


