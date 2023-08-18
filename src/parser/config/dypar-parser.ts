import { ExplicitMessageConfig } from "../../model/message/explicit/explicit-message-config";
import { WildcardMessageConfig } from "../../model/message/wildcard/wildcard-message-config";
import { CombinedMessageConfig } from "../../model/message/combined/combined-message-config";
import { DefaultConfigParser } from "./default/default-config-parser";
import { ApiPathParser } from "./api-path-parser";
import { ConfigReader } from "./config-reader";
import {DefaultConfig} from "../../model/default/default-config";

export class DyparConfigParser {
  private _explicitMessages: Array<ExplicitMessageConfig> = []
  private _wildcardMessages: Array<WildcardMessageConfig> = []
  private _combinedMessages: Array<CombinedMessageConfig> = []
  private _defaultConfig: DefaultConfig = new DefaultConfig()

  constructor(relativeConfigPath: string) {
    this.init(relativeConfigPath);
  }

  private init(relativeConfigPath: string) {
    const configReader = new ConfigReader();
    const yamlConfig = configReader.readConfig(relativeConfigPath);

    const apiPathParser = new ApiPathParser();
    const defaultConfigParser = new DefaultConfigParser(apiPathParser);
    this._defaultConfig = defaultConfigParser.parse(yamlConfig);
  }

  get explicitMessages() {
    return this._explicitMessages;
  }

  get wildcardMessages() {
    return this._wildcardMessages;
  }

  get combinedMessages() {
    return this._combinedMessages;
  }

  get defaultConfig() {
    return this._defaultConfig;
  }
}
