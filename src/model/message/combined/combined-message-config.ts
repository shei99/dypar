import { CombinedMessageTypeConfig } from "./combined-message-type-config";

export class CombinedMessageConfig {
  private _id: string;
  private _messageTypeConfigs: Array<CombinedMessageTypeConfig>;

  constructor(
    id: string,
    messageTypeConfigs: Array<CombinedMessageTypeConfig>,
  ) {
    this._id = id;
    this._messageTypeConfigs = messageTypeConfigs;
  }

  get id() {
    return this._id;
  }

  get messageTypeConfigs() {
    return this._messageTypeConfigs;
  }
}
