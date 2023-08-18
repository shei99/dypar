const axios = require("axios");

class HttpEmitter {
  constructor(logger) {
    this.logger = logger;
  }

  async send(msg, apiPath) {
    this.logger.debug(JSON.stringify(msg), apiPath);
    try {
      await axios.post(`http://localhost:9090${apiPath}`, msg);
    } catch (e) {
      this.logger.error(`Could not post data ${JSON.stringify(msg)}`);
    }
  }
}

module.exports = {
  HttpEmitter,
};
