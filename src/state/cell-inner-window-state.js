const { BatriumIdentifier } = require("../model/batrium-identifier");

class CellInnerWindowState {
  constructor() {
    this.state = {};
  }

  updateWith5033(msg) {
    if (this.state[this.getStateKey(msg)] == undefined) {
      this.state[this.getStateKey(msg)] = {};
    }

    this.state[this.getStateKey(msg)].controlChargeCellVoltHi =
      msg.ControlChargeCellVoltHi;
    this.state[this.getStateKey(msg)].controlChargeCellTempLo =
      msg.ControlChargeCellTempLo;
    this.state[this.getStateKey(msg)].controlChargeCellTempHi =
      msg.ControlChargeCellTempHi;
  }

  updateWith5158(msg) {
    if (this.state[this.getStateKey(msg)] == undefined) {
      this.state[this.getStateKey(msg)] = {};
    }

    this.state[this.getStateKey(msg)].controlDischargeCellVoltLo =
      msg.ControlDischargeCellVoltLo;
  }

  getState(msg) {
    return Object.assign({}, this.state[this.getStateKey(msg)]);
  }

  notFullyInstatiated() {
    return (this.controlChargeCellTempHi == undefined ||
      this.controlChargeCellTempLo == undefined ||
      this.controlChargeCellVoltHi == undefined ||
      this.controlDischargeCellVoltLo == undefined);
  }

  getStateKey(msg) {
    return new BatriumIdentifier(msg.HubId, msg.SystemId);
  }
}

module.exports = {
  CellInnerWindowState,
};
