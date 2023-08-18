import { ExplicitMessageTypeConfig } from "./explicit-message-type-config";

export class ExplicitMessageConfig {
  private _id: string | undefined;
  private _messageTypeConfigs: Array<ExplicitMessageTypeConfig>;

  constructor() {
    this._id = undefined;
    this._messageTypeConfigs = [];
  }

  setId(id: string): ExplicitMessageConfig {
    this._id = id;
    return this;
  }

  setMessageTypeConfigs(messageTypeConfigs: Array<ExplicitMessageTypeConfig>) {
    this._messageTypeConfigs = messageTypeConfigs;
    return this;
  }

  get id() {
    return this._id;
  }

  get messageTypeConfigs() {
    return this._messageTypeConfigs;
  }
}
