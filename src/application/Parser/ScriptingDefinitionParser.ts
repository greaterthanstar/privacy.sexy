import { IScriptingDefinition } from '@/domain/IScriptingDefinition';
import { YamlScriptingDefinition } from 'js-yaml-loader!./application.yaml';
import { ScriptingDefinition } from '@/domain/ScriptingDefinition';
import { ScriptingLanguage } from '@/domain/ScriptingLanguage';
import { IProjectInformation } from '@/domain/IProjectInformation';
import { createEnumParser } from '../Common/Enum';

export function parseScriptingDefinition(
    definition: YamlScriptingDefinition,
    info: IProjectInformation,
    date = new Date(),
    languageParser = createEnumParser(ScriptingLanguage)): IScriptingDefinition {
    if (!info) {
        throw new Error('undefined info');
    }
    if (!definition) {
        throw new Error('undefined definition');
    }
    const language = languageParser.parseEnum(definition.language, 'language');
    const startCode = applySubstitutions(definition.startCode, info, date);
    const endCode = applySubstitutions(definition.endCode, info, date);
    return new ScriptingDefinition(
        language,
        startCode,
        endCode,
    );
}

function applySubstitutions(code: string, info: IProjectInformation, date: Date): string {
    code = code.replace('{{ homepage }}', info.homepage);
    code = code.replace('{{ version }}', info.version);
    code = code.replace('{{ date }}', date.toUTCString());
    return code;
}
