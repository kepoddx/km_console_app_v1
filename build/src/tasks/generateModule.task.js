"use strict";
var __assign = (this && this.__assign) || function() {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _cmdline_1 = require("../libs/cmdline/index");
var _templating_1 = require("../libs/templating/index");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
/**
 *
 * @return {Observable}
 */
function genMod() {
    var selectConfig = { name: 'folderName', message: 'In which folder will your module live?' };
    var formChoices = [
        { name: 'className', message: 'Class Name' },
        { name: 'fileName', message: 'File Name' },
        { name: 'fileExt', message: 'File Extension ' }
    ];
    return _templating_1.MODULE_CHOICES
        .pipe(operators_1.map(function(d) { return d[1]; }), operators_1.switchMap(function(modsList) { return _cmdline_1.selectPrmpt(selectConfig, modsList); }), operators_1.switchMap(function(_) { return _cmdline_1.formPrmpt({ name: 'config' }, formChoices); }, function(_a, folderConfig) {
            var folderName = _a.folderName;
            return __assign({ folderName: folderName }, folderConfig['config']);
        }), operators_1.switchMap(function(finalOptions) { return _cmdline_1.confirmPrmpt({ name: 'verify' }, finalOptions); }, function(finalOptions, _a) {
            var verify = _a.verify;
            if (verify) {
                return finalOptions;
            } else {
                return false;
            }
        }), operators_1.switchMap(function(result) { return result === false ? genMod() : _templating_1.copyDirAndFiles(result); }), operators_1.catchError(function(err) { return rxjs_1.of(err); }));
}
exports.genMod = genMod;
//# sourceMappingURL=generateModule.task.js.map