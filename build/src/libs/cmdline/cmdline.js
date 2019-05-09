"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enquirer_1 = require("enquirer");
var rxjs_1 = require("rxjs");
exports.modGen = function (choices) {
    return rxjs_1.from(enquirer_1.prompt({
        type: 'select',
        name: 'moduleName',
        message: 'Which mod would you like to generate',
        choices: choices
    }));
};
function selectPrmpt(config, choices) {
    return rxjs_1.from(enquirer_1.prompt({
        choices: choices,
        name: config.name,
        message: config.message || 'Please choice one of the following:',
        type: 'select'
    }));
}
exports.selectPrmpt = selectPrmpt;
function formPrmpt(config, choices) {
    return rxjs_1.from(enquirer_1.prompt({
        choices: choices,
        name: config.name,
        message: config.message || 'Please provide the following information:',
        type: 'form'
    }));
}
exports.formPrmpt = formPrmpt;
function confirmPrmpt(config, optionsObj) {
    console.log(JSON.stringify(optionsObj, null, 4));
    return rxjs_1.from(enquirer_1.prompt({
        name: config.name,
        message: config.message || 'Are these options correct:',
        type: 'confirm'
    }));
}
exports.confirmPrmpt = confirmPrmpt;
//# sourceMappingURL=cmdline.js.map