const Parser = require("binary-parser").Parser;
const fs = require("fs");
const path = require("path");

class PayloadParser {
  constructor(logger) {
    this.logger = logger;
    this.parser = this.initParser();
    this.payloadFiles = this.initPayloadFiles();
    this.messageParsers = this.getPayloadParsers();
  }

  initParser() {
    return new Parser()
      .string("first", { encoding: "utf8", length: 1 })
      .int16le("MessageId", {
        formatter: (x) => {
          return x.toString(16);
        },
      })
      .string("nd", { encoding: "utf8", length: 1 })
      .int16le("SystemId")
      .uint16le("HubId");
  }

  initPayloadFiles() {
    return fs.readdirSync(path.join(__dirname, "payload"));
  }

  get getPayloadFiles() {
    return this.payloadFiles;
  }

  get getMessageParsers() {
    return this.messageParsers;
  }

  parsePayload(data) {
    return this.parser.parse(data);
  }

  getPayloadParsers() {
    let messageParsers = {};
    for (const file of this.payloadFiles) {
      try {
        let msgId = file.split("_")[1];
        messageParsers[msgId.toLowerCase()] = require("./payload/" + file);
        this.logger.debug("Loaded file: " + file);
      } catch (e) {
        this.logger.error("Could not load file: " + file);
        console.error(e);
      }
    }
    return messageParsers;
  }
}

module.exports = {
  PayloadParser,
};
