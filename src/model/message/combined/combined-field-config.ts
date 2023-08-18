import { CombinedIdentifier } from "./combined-identifier";
import { FieldConfig } from "../../field-config";

export class CombinedFieldConfig {
  private _field: FieldConfig;
  private _identifier: CombinedIdentifier;

  constructor(field: FieldConfig, identifier: CombinedIdentifier) {
    this._field = field;
    this._identifier = identifier;
  }

  get field() {
    return this._field;
  }

  get identifier() {
    return this._identifier;
  }
}
