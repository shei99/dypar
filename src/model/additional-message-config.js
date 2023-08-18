class AdditionalMessageConfig {
  type(parsedMessageConfig, fallbackValue, wildcard) {
    if (parsedMessageConfig.type !== undefined) {
      this.type = parsedMessageConfig.type;
    }
    this.type = (fallbackValue === undefined) ? wildcard : fallbackValue;
    return this;
  }
  fields(parsedMessageConfig, fallbackValue) {
    this.fields = (parsedMessageConfig.fields === undefined)
      ? fallbackValue
      : parsedMessageConfig.fields;
    return this;
  }
  batriumIds(parsedMessageConfig, fallbackValue) {
    this.batriumIds = (parsedMessageConfig.batriumIds === undefined)
      ? fallbackValue
      : parsedMessageConfig.batriumIds;
    return this;
  }
  sendRateInMilliseconds(parsedMessageConfig, fallbackValue) {
    this.sendRateInMilliseconds =
      (parsedMessageConfig.sendRateInMilliseconds === undefined)
        ? fallbackValue
        : parsedMessageConfig.sendRateInMilliseconds;
    return this;
  }
  apiPath(parsedMessageConfig, fallbackValue) {
    this.apiPath = (parsedMessageConfig.apiPath === undefined)
      ? fallbackValue
      : parsedMessageConfig.apiPath;
    return this;
  }
}

module.exports = {
  AdditionalMessageConfig,
};
