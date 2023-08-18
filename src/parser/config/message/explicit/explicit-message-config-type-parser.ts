import {ExplicitMessageTypeConfig} from "../../../../model/message/explicit/explicit-message-type-config";
import {Parser} from "../../parser";
import {ExplicitMessageConfig} from "../../../../model/message/explicit/explicit-message-config";
import {DefaultConfig} from "../../../../model/default/default-config";
import {DefaultConfigType} from "../../../../model/default/default-config-type";
import {ApiPathParser} from "../../api-path-parser";

export class ExplicitMessageConfigTypeParser implements Parser<Array<ExplicitMessageTypeConfig>>{
    private readonly _defaultConfig: DefaultConfig
    private readonly _messageFieldsConfigParser: MessageFieldsConfigParser
    private _apiPathParser: ApiPathParser;

    constructor(defaultConfig: DefaultConfig, messageFieldsConfigParser: MessageFieldsConfigParser, apiPathParser) {
        this._defaultConfig = defaultConfig
        this._messageFieldsConfigParser = messageFieldsConfigParser
        this._apiPathParser = apiPathParser
    }

    parse(yamlConfig: object | undefined): Array<ExplicitMessageTypeConfig> {
        console.log("ExplicitMessageConfigParser", yamlConfig);

        if (yamlConfig === undefined) {
            return [new ExplicitMessageTypeConfig()];
        }
        // @ts-ignore
        const yamlExplicitMessageTypesConfig = yamlConfig.messageTypes;
        console.log("yamlExplicitMessageTypesConfig", yamlExplicitMessageTypesConfig);
        if (yamlExplicitMessageTypesConfig === undefined) {
            console.log("returned");
            return [new ExplicitMessageTypeConfig()];
        }

        const explicitMessageTypeConfigs: Array<ExplicitMessageTypeConfig> = []
        for (const config of yamlExplicitMessageTypesConfig) {
            console.log("Config", config)
            let explictMessageTypeConfig = new ExplicitMessageTypeConfig()
            explictMessageTypeConfig
                .setType(config.type)
                .setFields(this._messageFieldsConfigParser.parse(config.fields))
                .setSendRateInMilliseconds(config.sendRateInMilliseconds)
                .setApiPath(this._apiPathParser.parse(config.apiPath));
            explicitMessageTypeConfigs.push(explictMessageTypeConfig)
        }
        console.log("Explicit Message Type Config", JSON.stringify(explicitMessageTypeConfigs))

        return explicitMessageTypeConfigs;
    }
}
