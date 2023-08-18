export class ExcludeConfig {
  private _implicit: boolean;
  private _explicit: Array<string>;

  constructor() {
    this._implicit = true;
    this._explicit = [];
  }

  setImplicit(implicit: boolean): ExcludeConfig {
    this._implicit = implicit;
    return this;
  }

  setExplicit(explicit: Array<string>): ExcludeConfig {
    this._explicit = explicit;
    return this;
  }

  get implicit() {
    return this._implicit;
  }

  get explicit() {
    return this._explicit;
  }
}
