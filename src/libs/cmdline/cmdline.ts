import { prompt } from 'enquirer';
import { from, of } from 'rxjs'

export const modGen = (choices:string[]) => {
    return from(prompt({
        type: 'select',
        name: 'moduleName',
        message: 'Which mod would you like to generate',
        choices
    }))
}

export interface PrmptConfig {
    name: string;
    message?: string;
}
export interface PrmptChoice {
    name:string;
    message:string
}
export interface ConfigModChoices {
    moduleName:string;
    className:string;
}
export function selectPrmpt(config:PrmptConfig, choices:PrmptChoice[]) {
    return from(prompt({
        choices,
        name: config.name,
        message: config.message || 'Please choice one of the following:',
        type: 'select'
   }))    
}

export function formPrmpt(config:PrmptConfig, choices:PrmptChoice[]) {
   return from(prompt({
        choices,
        name: config.name,
        message: config.message || 'Please provide the following information:',
        type: 'form'
   }))
}

export function confirmPrmpt( config:PrmptConfig,optionsObj:Object) {
    console.log(JSON.stringify(optionsObj, null, 4))
    return from(prompt({
         name: config.name,
         message: config.message || 'Are these options correct:',
         type: 'confirm'
    }))

}