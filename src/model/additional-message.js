class AdditionalMessage {
  constructor(message, batriumIds, sendRateInMilliseconds, apiPath) {
    this.message = message;
    this.batriumIds = batriumIds;
    this.sendRateInMilliseconds = sendRateInMilliseconds;
    this.apiPath = apiPath;
  }
}

module.exports = {
  AdditionalMessage,
};
