import { Parser } from "../parser";
import { ApiPath } from "../../../model/api-path";
import {MessageConfig} from "../../../model/message/message-config";

export class MessageConfigParser implements Parser<MessageConfig> {
  private readonly _apiPathParser: Parser<ApiPath>;

  constructor(apiPathParser: Parser<ApiPath>) {
    this._apiPathParser = apiPathParser;
  }

  parse(yamlConfig: object | undefined): MessageConfig {
    console.log("yamlConfig", yamlConfig);
    if (yamlConfig === undefined) {
      return new MessageConfig();
    }
    // @ts-ignore
    const yamlMessageConfig = yamlConfig.messages;
    console.log("yamlMessageConfig", yamlMessageConfig);
    if (yamlMessageConfig === undefined) {
      console.log("returned");
      return new MessageConfig();
    }

    let messageConfig = new MessageConfig();

    // parse explicit
    // parse wildcard
    // parse combined

    // messageConfig.setExplicitMessageConfigs()
    //   .setWildcardMessageConfigs().setCombinedMessageConfigs()

    return messageConfig;
  }
}
