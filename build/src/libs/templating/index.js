"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var stream_1 = require("stream");
var mustache = require("mustache");
var chalk_1 = require("chalk");
var log = console.log;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var readdir$ = rxjs_1.bindCallback(fs.readdir);
var mkdir$ = rxjs_1.bindCallback(function (dirPath, options, callback) { return fs.mkdir(dirPath, options, callback); });
var stat$ = rxjs_1.bindCallback(fs.stat);
var templatingDir = "" + __dirname;
/**
 * @param { }
 * @return - List of all templates in folder that can be used.  Folder name is the module name.
 */
exports.MODULE_CHOICES = readdir$(templatingDir + "/templates");
var templateDir = path.join(process.cwd(), 'src', 'libs', 'templating', 'templates');
var srcDir = path.join(process.cwd(), 'src');
var hydrateTemplate = function (varObj) {
    return new stream_1.Transform({
        transform: function (data, _, done) {
            var hydratedData = mustache.render(data.toString(), varObj);
            done(null, hydratedData);
        }
    });
};
function genFileAndDir(moduleName, configObj) {
    var reader = fs.createReadStream(templateDir + "/" + moduleName + "/" + moduleName + ".tpl");
    var writer = fs.createWriteStream(srcDir + "/" + moduleName + "/" + configObj.moduleName + ".ts");
    console.log("COnfig", configObj);
    writer.on('error', function (err) {
        log(chalk_1.default.red(err));
    });
    writer.on('finish', function () {
        console.log("DOne");
    });
    reader
        .pipe(hydrateTemplate(configObj))
        .pipe(writer);
}
exports.genFileAndDir = genFileAndDir;
function copyDirAndFiles(config) {
    return verifyDir(srcDir + "/" + config.folderName)
        .pipe(operators_1.switchMap(function (res) { return !isError(res) ? mkdir$(srcDir + "\\" + config.folderName + "\\" + config.fileName, { recursive: true }) : rxjs_1.of(null); }), operators_1.switchMap(function () { return copyFiles(templateDir + "\\" + config.folderName, srcDir + "\\" + config.folderName, config); }));
}
exports.copyDirAndFiles = copyDirAndFiles;
function copyFiles(fromDirPath, toDirPath, config) {
    log(fromDirPath, toDirPath);
    return readdir$(fromDirPath)
        .pipe(operators_1.map(function (res) { return res[1]; }), operators_1.tap(function (res) { return log(res); }), operators_1.mergeMap(function (fileNames) { return rxjs_1.forkJoin(fileNames.map(function (fileName) { return fileCopyStream(fileName, fromDirPath, toDirPath, config); })); }));
}
exports.copyFiles = copyFiles;
function fileCopyStream(fileName, fromPath, toPath, config) {
    return rxjs_1.Observable.create(function (observer) {
        var verfiedFilName = fileName.indexOf('index') === -1 ? config.fileName + "." + fileName.replace(/tpl/, "" + config.fileExt) : "" + fileName.replace(/tpl/, "" + config.fileExt);
        var reader = fs.createReadStream(fromPath + "\\" + fileName);
        var writeTo = path.join(toPath, config.fileName, verfiedFilName);
        var writer = fs.createWriteStream(writeTo);
        writer.on('error', function (err) {
            observer.next(err);
            observer.complete();
        });
        writer.on('finish', function () {
            observer.next("Complete");
            observer.complete();
        });
        reader
            .pipe(hydrateTemplate(config))
            .pipe(writer);
    });
}
exports.fileCopyStream = fileCopyStream;
function verifyDir(dirPath) {
    return stat$(dirPath)
        .pipe(operators_1.map(function (res) { return isError(res) ? false : res[1].isDirectory(); }));
}
exports.verifyDir = verifyDir;
function isError(res) {
    return res instanceof Error;
}
exports.isError = isError;
//# sourceMappingURL=index.js.map