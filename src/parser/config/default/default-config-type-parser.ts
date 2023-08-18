import {Parser} from "../parser";
import {DefaultConfigType} from "../../../model/default/default-config-type";
import {ApiPath} from "../../../model/api-path";

export class DefaultConfigTypeParser implements Parser<DefaultConfigType> {
    private _apiPathParser: Parser<ApiPath>;

    constructor(apiPathParser: Parser<ApiPath>) {
        this._apiPathParser = apiPathParser;
    }

    parse(yamlConfig: object | undefined): DefaultConfigType {
        console.log("Default Config Type Parser: yamlConfig", yamlConfig)
        if (yamlConfig === undefined) {
            return new DefaultConfigType();
        }

        let defaultConfig = new DefaultConfigType()
        // @ts-ignore
        defaultConfig.setGlobalSystemId(yamlConfig.globalSystemId)
            // @ts-ignore
            .setSendRateInMilliseconds(yamlConfig.sendRateInMilliseconds)
            // @ts-ignore
            .setApiPath(this._apiPathParser.parse(yamlConfig.apiPath));

        return defaultConfig;
    }
}
