class EmitterState {
  constructor(logger) {
    this.state = {};
    this.logger = logger;
  }

  shouldBeSent(batriumId, msgId, msgType, sendRateInMilliseconds) {
    this.logger.debug(
      msgId,
      msgType,
      this.state[this.getStateKey(batriumId, msgId, msgType)],
    );
    if (this.state[this.getStateKey(batriumId, msgId, msgType)] == undefined) {
      this.state[this.getStateKey(batriumId, msgId, msgType)] = Date.now();
      return true;
    }

    let currentTimestamp = Date.now();
    if (
      currentTimestamp -
          this.state[this.getStateKey(batriumId, msgId, msgType)] >
        sendRateInMilliseconds
    ) {
      this.state[this.getStateKey(batriumId, msgId, msgType)] =
        currentTimestamp;
      return true;
    }

    return false;
  }

  getStateKey(batriumId, msgId, msgType) {
    return `${batriumId}-${msgId}-${msgType}`;
  }
}

module.exports = {
  EmitterState,
};
