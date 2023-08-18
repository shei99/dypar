import {Parser} from "../parser";
import {ApiPath} from "../../../model/api-path";
import {DefaultConfig} from "../../../model/default/default-config";
import {DefaultConfigTypeParser} from "./default-config-type-parser";
import {DefaultExplicitConfigParser} from "./default-explicit-config-parser";
import {DefaultWildcardConfigParser} from "./default-wildcard-config-parser";

export class DefaultConfigParser implements Parser<DefaultConfig> {
    private readonly _apiPathParser: Parser<ApiPath>;

    constructor(apiPathParser: Parser<ApiPath>) {
        this._apiPathParser = apiPathParser;
    }

    parse(yamlConfig: object | undefined): DefaultConfig {
        console.log("yamlConfig", yamlConfig)
        if (yamlConfig === undefined) {
            return new DefaultConfig()
        }
        // @ts-ignore
        const yamlDefaultConfig = yamlConfig.default;
        console.log("yamlDefaultConfig", yamlDefaultConfig)
        if (yamlDefaultConfig === undefined) {
            console.log("returned")
            return new DefaultConfig()
        }

        let defaultConfig = new DefaultConfig()

        const defaultConfigTypeParser = new DefaultConfigTypeParser(this._apiPathParser)
        // parse explicit
        const defaultExplicitConfigParser = new DefaultExplicitConfigParser(defaultConfigTypeParser)
        // parse wildcard
        const defaultWildcardConfigParser = new DefaultWildcardConfigParser(defaultConfigTypeParser)

        defaultConfig.setExplicitDefaultConfig(defaultExplicitConfigParser.parse(yamlDefaultConfig))
            .setWildcardDefaultConfig(defaultWildcardConfigParser.parse(yamlDefaultConfig))


        return defaultConfig;
    }
}
