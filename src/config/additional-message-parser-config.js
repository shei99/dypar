const yaml = require("js-yaml");
const fs = require("fs");
const { AdditionalMessageConfig } = require(
  "../model/additional-message-config",
);
const { inspect } = require("util");

class AdditionalMessageParserConfig {
  constructor(relativeConfigPath, payloadFiles, logger) {
    this.logger = logger;
    const config = this.loadConfig(relativeConfigPath);
    this.requiredMessageIds = this.parseRequiredMessageIds(config);
    this.messageNames = this.parsePayloadFiles(payloadFiles);
    this.additionalMessages = this.parseAdditionalMessages(config);
    this.additionalMessageIds = this.parseAdditionalMessageIds();
  }

  get getRequiredMessageIds() {
    return this.requiredMessageIds;
  }

  get getAdditionalMessageIds() {
    return this.additionalMessageIds;
  }

  getAdditionalMessageConfig(msgId) {
    return (this.additionalMessages[msgId] == undefined)
      ? undefined
      : this.additionalMessages[msgId];
  }

  getAdditionalMessageName(msgId) {
    return this.messageNames[msgId];
  }

  parsePayloadFiles(payloadFiles) {
    let messageNames = {};
    payloadFiles.forEach(function (filename) {
      let fileParts = filename.split("_");
      messageNames[fileParts[1].toLowerCase()] = fileParts[2].replace(
        ".js",
        "",
      );
    });
    return messageNames;
  }

  loadConfig(relativConfigPath) {
    try {
      return yaml.load(
        fs.readFileSync(
          relativConfigPath,
          "utf8",
        ),
      );
    } catch (e) {
      this.logger.error(
        `Could not load file at ${relativConfigPath}, error ${e}`,
      );
      process.exit(1);
    }
  }

  parseRequiredMessageIds(parserConfig) {
    return (parserConfig.messages.required == undefined)
      ? []
      : parserConfig.messages.required;
  }

  parseAdditionalMessages(parserConfig) {
    const parseConfigAdditionalMessages = parserConfig.messages.additional;
    if (
      parseConfigAdditionalMessages == undefined ||
      parseConfigAdditionalMessages.length == 0
    ) {
      return [];
    }

    let additionalMessages = {};
    let wildcardConfig = [];
    for (const msg of parseConfigAdditionalMessages) {
      for (const msgType of msg.messageTypes) {
        console.log(msgType);
        if (
          !this.checkForOnlyWildcardInAdditionalMessages(
            parseConfigAdditionalMessages,
          ) && msg.id === "*"
        ) {
          wildcardConfig.push(msgType);
          continue;
        }

        if (additionalMessages[msg.id] == undefined) {
          additionalMessages[msg.id] = [];
        }
        let msgConfig = this.buildAdditionalMessage(msg.id, msgType);
        additionalMessages[msg.id].push(msgConfig);
      }
    }

    this.parseAndAddWildcardAdditionalMessages(
      additionalMessages,
      wildcardConfig,
    );

    return additionalMessages;
  }

  buildAdditionalMessage(msgId, msgType) {
    msgType.fields = this.parseFields(msgType.fields);
    let msgConfig = new AdditionalMessageConfig();
    msgConfig.type(msgType, this.messageNames[msgId], "*").fields(
      msgType,
      "*",
    )
      .batriumIds(msgType, ["*"]).sendRateInMilliseconds(msgType, 1000)
      .apiPath(msgType, this.messageNames[msgId]);
    return msgConfig;
  }

  parseFields(msgFields) {
    // console.log("parsefields", msgFields);
    let fields = [];
    for (const field of msgFields) {
      fields.push(this.parseField(field));
      console.log("Fields");
      console.log(JSON.stringify(fields));
    }
    return fields;
  }

  parseField(field) {
    if (typeof field === "string" || field instanceof String) {
      let hasDepth = field.includes("/");
      if (!hasDepth) {
        return field;
      } else if (hasDepth) {
        return this.parseStringField(field);
      }
    } else {
      return this.parseObjectField(field);
    }
  }

  parseStringField(field) {
    let fields = {};
    if (typeof field === "string" || field instanceof String) {
      let splittedFields = field.split("/");
      if (splittedFields.length <= 2) {
        fields[splittedFields[0]] = splittedFields[1];
      } else {
        fields[splittedFields[0]] = this.parseStringField(
          splittedFields.slice(1).join("/"),
        );
      }
    }
    console.log("String fields", JSON.stringify(fields));
    return fields;
  }

  parseObjectField(field) {
    let obj = {};
    if (typeof field !== "string" || !(field instanceof String)) {
      for (const [key, value] of Object.entries(field)) {
        console.log(`Key: ${key}, Value: ${value}`);
        if (key.includes("/")) {
          let parsedKey = this.parseStringKey(key, value);
          // console.log("parsedKey", JSON.stringify(parsedKey));
          obj = this.parseField(parsedKey[0]);
        } else {
          let lst = [];
          for (const el of value) {
            lst.push(this.parseField(el));
          }
          obj[key] = lst;
        }
      }
    }
    // console.log("Obj", JSON.stringify(obj), JSON.stringify(field));
    return obj;
  }

  parseStringKey(field, value) {
    let fields = {};
    if (typeof field === "string" || field instanceof String) {
      let splittedFields = field.split("/");
      if (splittedFields.length <= 1) {
        fields[splittedFields[0]] = value;
      } else {
        fields[splittedFields[0]] = this.parseStringKey(
          splittedFields.slice(1).join("/"),
          value,
        );
      }
    }
    // console.log("foo", JSON.stringify(fields));
    return [fields];
  }

  checkForOnlyWildcardInAdditionalMessages(additionalMessages) {
    return additionalMessages.every((message) => {
      return message.id == "*";
    });
  }

  parseAndAddWildcardAdditionalMessages(additionalMessages, wildcardConfig) {
    this.logger.debug(
      `AdditionalMessages: ${additionalMessages}, WildcardConfig: ${wildcardConfig}`,
    );
    if (wildcardConfig.length == 0) {
      return additionalMessages;
    }

    let parseIds = Object.keys(additionalMessages);
    for (const msgId of Object.keys(this.messageNames)) {
      // if already parsed and batriumId is included in parsed message config
      if (
        parseIds.includes(msgId) &&
        this.isBatriumIdPresent(additionalMessages[msgId], msgId)
      ) {
        continue;
      }

      if (additionalMessages[msgId] == undefined) {
        additionalMessages[msgId] = [];
      }

      // delete key so that it gets replaced with the name of the message
      delete wildcardConfig[0].type;
      additionalMessages[msgId].push(this.buildAdditionalMessage(
        msgId,
        wildcardConfig[0],
      ));
    }

    return this.parseAndAddWildcardAdditionalMessages(
      additionalMessages,
      wildcardConfig.slice(1),
    );
  }

  isBatriumIdPresent(additionalMessage, msgId) {
    if (additionalMessage.some((msg) => msg.batriumIds.includes("*"))) {
      return true;
    }

    let presentBatriumIds = new Set();
    for (const msgType of additionalMessage) {
      presentBatriumIds.add(msgType.batriumIds);
    }

    return presentBatriumIds.has(msgId);
  }

  parseAdditionalMessageIds() {
    if (this.additionalMessages == undefined) {
      return [];
    }
    return Object.keys(this.additionalMessages);
  }
}

module.exports = {
  AdditionalMessageParserConfig,
};
