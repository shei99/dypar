export class CombinedIdentifier {
  private _id: string;
  private _type: string;

  constructor(id: string, type: string) {
    this._id = id;
    this._type = type;
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }
}
