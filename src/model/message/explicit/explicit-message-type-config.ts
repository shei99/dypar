import { WILDCARD_OPERATOR } from "../../constants";
import { ApiPath } from "../../api-path";
import { DefaultConfigType } from "../../default/default-config-type";
import { FieldConfig } from "../../field-config";

export class ExplicitMessageTypeConfig {
  private _type: string;
  private _fields: Array<FieldConfig>;
  private _sendRateInMilliseconds: number;
  private _globalSystemId: Array<string>;
  private _apiPath: ApiPath;

  constructor(
    defaultConfig: DefaultConfigType,
  ) {
    this._type = WILDCARD_OPERATOR;
    this._fields = [new FieldConfig(WILDCARD_OPERATOR)];
    this._sendRateInMilliseconds = defaultConfig.sendRateInMilliseconds;
    this._globalSystemId = defaultConfig.globalSystemId;
    this._apiPath = defaultConfig.apiPath;
  }

  setType(type: string): ExplicitMessageTypeConfig {
    this._type = type;
    return this;
  }

  setFields(fields: Array<FieldConfig>): ExplicitMessageTypeConfig {
    this._fields = fields;
    return this;
  }

  setSendRateInMilliseconds(
    sendRateInMilliseconds: number,
  ): ExplicitMessageTypeConfig {
    this._sendRateInMilliseconds = sendRateInMilliseconds;
    return this;
  }

  setGlobalSystemId(globalSystemId: Array<string>): ExplicitMessageTypeConfig {
    this._globalSystemId = globalSystemId;
    return this;
  }

  setApiPath(apiPath: ApiPath): ExplicitMessageTypeConfig {
    this._apiPath = apiPath;
    return this;
  }

  get type() {
    return this._type;
  }

  get fields() {
    return this._fields;
  }

  get sendRateInMilliseconds() {
    return this._sendRateInMilliseconds;
  }

  get globalSystemId() {
    return this._globalSystemId;
  }

  get apiPath() {
    return this._apiPath;
  }
}
