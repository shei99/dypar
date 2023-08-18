const { AdditionalMessage } = require("../model/additional-message");

class AdditionalMessageParser {
  constructor(parserConfig) {
    this.parserConfig = parserConfig;
  }

  getAdditionalMessageConfigForMsg(msg) {
    let messageConfig = this.parserConfig.getAdditionalMessageConfig(
      msg.MessageId,
    );
    if (messageConfig !== undefined) {
      return messageConfig;
    }
    return this.parserConfig.getAdditionalMessageConfig("*");
  }

  parseToAdditionalMessages(msg) {
    let messages = [];
    const messageConfig = this.getAdditionalMessageConfigForMsg(msg);
    for (const messageTypeConfig of messageConfig) {
      messages.push(this.parseToAdditionalMessage(msg, messageTypeConfig));
    }
    return messages;
  }

  parseToAdditionalMessage(msg, messageTypeConfig) {
    return new AdditionalMessage(
      this.parseMessage(msg, messageTypeConfig),
      this.getBatriumIdsOfMsg(messageTypeConfig),
      this.getSendRateInMillisecondsOfMsg(messageTypeConfig),
      this.getApiPathOfMsg(messageTypeConfig),
    );
  }

  parseMessage(msg, messageTypeConfig) {
    if (messageTypeConfig === undefined) {
      return;
    }

    let message = {};
    // Add "metadata"
    message["systemId"] = msg.SystemId;
    message["hubId"] = msg.HubId;

    // Add specified fields
    if (
      messageTypeConfig.fields == "*" || messageTypeConfig.fields == ["*"]
    ) {
      message["data"] = this.parseMessageData(msg, Object.keys(msg));
    } else {
      message["data"] = this.parseMessageData(msg, messageTypeConfig.fields);
    }

    // Add type of message
    if (messageTypeConfig.type == "*") {
      message["type"] = this.parserConfig.getAdditionalMessageName(
        msg.MessageId,
      );
    } else {
      message["type"] = messageTypeConfig.type;
    }

    return message;
  }

  parseMessageData(msg, attributes) {
    let data = {};
    // console.log("Attributes", attributes);
    for (const attribute of attributes) {
      if (typeof attribute === "string" || attribute instanceof String) {
        // console.log(msg);
        data[attribute] = msg[attribute];
      } else {
        for (const [key, value] of Object.entries(attribute)) {
          // console.log("key/value", key, value);
          let list = [];
          if (Symbol.iterator in Object(msg[key])) {
            for (const element of msg[key]) {
              list.push(this.parseMessageData(element, value));
            }
            data[key] = list;
          } else {
            data[key] = this.parseMessageData(msg[key], value);
          }
        }
      }
    }
    console.log("DAta", JSON.stringify(data));
    return data;
  }

  getBatriumIdsOfMsg(messageTypeConfig) {
    if (messageTypeConfig === undefined) {
      return;
    }
    return messageTypeConfig.batriumIds;
  }

  getSendRateInMillisecondsOfMsg(messageTypeConfig) {
    if (messageTypeConfig === undefined) {
      return;
    }
    return messageTypeConfig.sendRateInMilliseconds;
  }

  getApiPathOfMsg(messageTypeConfig) {
    if (messageTypeConfig === undefined) {
      return;
    }
    return messageTypeConfig.apiPath;
  }
}

module.exports = {
  AdditionalMessageParser,
};
