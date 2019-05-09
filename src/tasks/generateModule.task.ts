import { selectPrmpt, PrmptChoice, PrmptConfig, formPrmpt, confirmPrmpt } from '@cmdline'
import { MODULE_CHOICES, copyDirAndFiles } from '@templating'
import { switchMap, map, catchError, retry, repeat } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
/**
 * 
 * @return {Observable}
 */
export function genMod():Observable<any> {
    const selectConfig:PrmptConfig =  { name: 'folderName', message: 'In which folder will your module live?'};
    const formChoices:PrmptChoice[] = [
        { name: 'className', message: 'Class Name'},
        { name: 'fileName', message: 'File Name'},
        { name: 'fileExt', message: 'File Extension '}
    ];
    return MODULE_CHOICES
        .pipe(
            map((d)=> d[1]),
            switchMap((modsList:PrmptChoice[]) => selectPrmpt(selectConfig, modsList)),
            switchMap( _ => formPrmpt({ name: 'config' }, formChoices), ({folderName}:any, folderConfig)=> {
                return {
                    folderName,
                    ...folderConfig['config']
                }
            }),
            switchMap( finalOptions => confirmPrmpt({name: 'verify'}, finalOptions), (finalOptions, {verify}:any) => {
                if(verify) {
                    return finalOptions
                } else {
                  return false
                }
            }),
            switchMap(result => result === false ? genMod() : copyDirAndFiles(result)),
            catchError(err => of(err))

        )
}

