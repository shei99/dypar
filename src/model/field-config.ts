export class FieldConfig {
  private _name: string;
  private _rename: string | undefined;

  constructor(name: string) {
    this._name = name;
    this._rename = undefined;
  }

  setRename(rename: string): FieldConfig {
    this._rename = rename;
    return this;
  }

  get name() {
    return this._name;
  }

  get rename() {
    return this._rename;
  }
}
