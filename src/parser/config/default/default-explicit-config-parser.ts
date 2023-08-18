import { Parser } from "../parser";
import { DefaultConfigType } from "../../../model/default/default-config-type";

export class DefaultExplicitConfigParser implements Parser<Array<DefaultConfigType>> {
    private _defaultConfigTypeParser: Parser<DefaultConfigType>

    constructor(defaultConfigTypeParser: Parser<DefaultConfigType>) {
        this._defaultConfigTypeParser = defaultConfigTypeParser
    }

    parse(yamlConfig: object | undefined): Array<DefaultConfigType> {
        console.log("DefaultExplicit: yamlConfig", yamlConfig)
        if (yamlConfig === undefined) {
            return [new DefaultConfigType()];
        }

        // @ts-ignore
        const yamlDefaultExplicitConfig: Array<object> = yamlConfig.explicit;
        if (yamlDefaultExplicitConfig === undefined) {
            console.log("returned")
            return [new DefaultConfigType()];
        }

        const defaultConfigs: Array<DefaultConfigType> = []
        for (const config of yamlDefaultExplicitConfig) {
            console.log("Config", config)
            // @ts-ignore
            defaultConfigs.push(this._defaultConfigTypeParser.parse(config))
        }
        console.log("Default Explicit Config", JSON.stringify(defaultConfigs))

        return defaultConfigs;
    }
}
