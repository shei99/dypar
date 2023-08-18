import { ExcludeConfig } from "./exclude-config";
import { ExplicitMessageTypeConfig } from "../explicit/explicit-message-type-config";

export class WildcardMessageConfig {
  private _id: string;
  private _messageTypeConfigs: Array<ExplicitMessageTypeConfig>;
  private _exclude: ExcludeConfig;

  constructor(
    id: string,
    messageTypeConfigs: Array<ExplicitMessageTypeConfig>,
  ) {
    this._id = id;
    this._messageTypeConfigs = messageTypeConfigs;
    this._exclude = new ExcludeConfig();
  }

  setExcludeConfig(exclude: ExcludeConfig): WildcardMessageConfig {
    this._exclude = exclude;
    return this;
  }

  get id() {
    return this._id;
  }

  get messageTypeConfigs() {
    return this._messageTypeConfigs;
  }

  get exclude() {
    return this._exclude;
  }
}
