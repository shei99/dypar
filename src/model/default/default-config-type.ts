import { WILDCARD_OPERATOR } from "../constants";
import { ApiPath } from "../api-path";

export class DefaultConfigType {
  private _globalSystemId: Array<string>;
  private _sendRateInMilliseconds: number;
  private _apiPath: ApiPath;

  constructor() {
    this._globalSystemId = [WILDCARD_OPERATOR];
    this._sendRateInMilliseconds = 1000;
    this._apiPath = new ApiPath();
  }

  setGlobalSystemId(globalSystemId: Array<string>): DefaultConfigType {
    this._globalSystemId = globalSystemId;
    return this;
  }

  setSendRateInMilliseconds(sendRateInMilliseconds: number): DefaultConfigType {
    this._sendRateInMilliseconds = sendRateInMilliseconds;
    return this;
  }

  setApiPath(apiPath: ApiPath) {
    this._apiPath = apiPath;
    return this;
  }

  get globalSystemId() {
    return this._globalSystemId;
  }

  get sendRateInMilliseconds() {
    return this._sendRateInMilliseconds;
  }

  get apiPath() {
    return this._apiPath;
  }
}
