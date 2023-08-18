import { ExplicitMessageConfig } from "./explicit/explicit-message-config";
import { WildcardMessageConfig } from "./wildcard/wildcard-message-config";
import { CombinedMessageConfig } from "./combined/combined-message-config";

export class MessageConfig {
  private _explicitMessageConfigs: Array<ExplicitMessageConfig> = [];
  private _wildcardMessageConfigs: Array<WildcardMessageConfig> = [];
  private _combinedMessageConfigs: Array<CombinedMessageConfig> = [];

  setExplicitMessageConfigs(
    explicitMessageConfigs: Array<ExplicitMessageConfig>,
  ) {
    this._explicitMessageConfigs = explicitMessageConfigs;
    return this;
  }

  setWildcardMessageConfigs(
    wildcardMessageConfigs: Array<WildcardMessageConfig>,
  ) {
    this._wildcardMessageConfigs = wildcardMessageConfigs;
    return this;
  }

  setCombinedMessageConfigs(
    combinedMessageConfigs: Array<CombinedMessageConfig>,
  ) {
    this._combinedMessageConfigs = combinedMessageConfigs;
    return this;
  }

  get explicitMessageConfigs() {
    return this._explicitMessageConfigs;
  }

  get wildcardMessageConfigs() {
    return this._wildcardMessageConfigs;
  }

  get combinedMessageConfigs() {
    return this._combinedMessageConfigs;
  }
}
