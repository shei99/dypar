import { WILDCARD_OPERATOR } from "./constants";

export class ApiPath {
  private _http: string | undefined;
  private _topic: string | undefined;

  constructor() {
    this._http = undefined;
    this._topic = undefined;
  }

  setHttp(http: string | undefined): ApiPath {
    if (http !== undefined) {
      this._http = http;
    }
    return this;
  }

  setTopic(topic: string | undefined) {
    if (topic !== undefined) {
      this._topic = topic;
    }
    return this;
  }

  get http() {
    return this._http;
  }

  get topic() {
    return this._topic;
  }
}
