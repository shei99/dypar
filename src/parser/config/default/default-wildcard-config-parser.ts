import { Parser } from "../parser";
import { DefaultConfigType } from "../../../model/default/default-config-type";

export class DefaultWildcardConfigParser implements Parser<DefaultConfigType> {
    private _defaultConfigTypeParser: Parser<DefaultConfigType>

    constructor(defaultConfigTypeParser: Parser<DefaultConfigType>) {
        this._defaultConfigTypeParser = defaultConfigTypeParser
    }

    parse(yamlConfig: object | undefined): DefaultConfigType {
        console.log("DefaultWildcard: yamlConfig", yamlConfig)
        // @ts-ignore
        const yamlDefaultWildcardConfig: Array<object> = yamlConfig.wildcard;
        if (yamlDefaultWildcardConfig === undefined) {
            console.log("returned")
            return new DefaultConfigType();
        }

        return this._defaultConfigTypeParser.parse(yamlDefaultWildcardConfig)
    }
}
