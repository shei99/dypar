const { BatriumIdentifier } = require("../model/batrium-identifier");
const { CellCriticalWindow } = require("../../../scraper/batrium/src/dto/cell-critical-window");
const { CellInnerWindow } = require("../../../scraper/batrium/src/dto/cell-inner-window");
const { ShuntCriticalWindow } = require("../../../scraper/batrium/src/dto/shunt-critical-window");
const { ShuntInnerWindow } = require("../../../scraper/batrium/src/dto/shunt-inner-window");
const { CurrentShuntValues } = require("../../../scraper/batrium/src/dto/current-shunt-values");
const { CurrentCellnodeValues } = require("../../../scraper/batrium/src/dto/current-cellnode");

class EmitterController {
  constructor(
    innerWindowState,
    emitterState,
    additionalMessageParser,
    logger,
  ) {
    this.emitters = [];
    this.innerWindowState = innerWindowState;
    this.emitterState = emitterState;
    this.additionalMessageParser = additionalMessageParser;
    this.logger = logger;
  }

  subscribe(emitter) {
    this.emitters.push(emitter);
  }

  async notify(msg, apiPath) {
    for (const emitter of this.emitters) {
      emitter.send(msg, apiPath);
    }
  }

  async publish(msg) {
    this.logger.debug(`Message ${msg}`);
    if (
      this.additionalMessageParser.parserConfig.getRequiredMessageIds.includes(
        msg.MessageId,
      ) ||
      this.additionalMessageParser.parserConfig.getRequiredMessageIds[0] === "*"
    ) {
      await this.emitRequiredMessage(msg);
    }

    if (
      this.additionalMessageParser.parserConfig.getAdditionalMessageIds
        .includes(msg.MessageId) ||
      this.additionalMessageParser.parserConfig.getAdditionalMessageIds[0] ===
        "*"
    ) {
      await this.emitAdditionalMessage(msg);
    }
  }

  async emitRequiredMessage(msg) {
    switch (msg.MessageId) {
      case "415a":
        // Cell Status
        let cellnodeValues = new CurrentCellnodeValues(msg);
        await this.notify(cellnodeValues, "/batrium/cells/current");
        break;
      case "3f34":
        // Shunt Status
        let shuntValues = new CurrentShuntValues(msg);
        await this.notify(shuntValues, "/batrium/shunt/current");
        break;
      case "4e33":
        // Shunt Volt Limp (Inner Window)
        let shuntInnerWindow = new ShuntInnerWindow(msg);
        await this.notify(shuntInnerWindow, "/batrium/shunt/innerWindow");
        break;
      case "5033":
        // Cell Temp and Cell Charge Volt Hi (Inner Window)
        this.innerWindowState.updateWith5033(msg);
        // await this.notify(
        //   this.innerWindowState.state,
        //   "/batrium/cells/innerWindow",
        // );
        break;
      case "5158":
        // Cell Discharge Volt Lo (Inner Window)
        this.innerWindowState.updateWith5158(msg);
        let cellInnerWindow = new CellInnerWindow(msg);
        cellInnerWindow.updateWithInnerWindow = this.innerWindowState.getState(
          msg,
        );
        await this.notify(
          cellInnerWindow,
          "/batrium/cells/innerWindow",
        );
        break;
      case "4f33":
        // Critical Control Values
        let cellCriticalWindow = new CellCriticalWindow(msg);
        let shuntCriticalWindow = new ShuntCriticalWindow(msg);
        await this.notify(cellCriticalWindow, "/batrium/cells/critical");
        await this.notify(shuntCriticalWindow, "/batrium/shunt/critical");
        break;
    }
  }

  async emitAdditionalMessage(msg) {
    let additionalMessages = this.additionalMessageParser
      .parseToAdditionalMessages(msg);

    for (const additionalMessage of additionalMessages) {
      // only send, when the message contains any data
      if (Object.keys(additionalMessage.message.data).length === 0) {
        continue;
      }
      for (const configuredBatriumId of additionalMessage.batriumIds) {
        // skip sending, when batriumIds of msg and configuration dont match
        let msgBatriumId = new BatriumIdentifier(msg.HubId, msg.SystemId);
        if (
          configuredBatriumId !== msgBatriumId &&
          (configuredBatriumId != "*" || configuredBatriumId != ["*"])
        ) {
          continue;
        }

        if (
          this.emitterState.shouldBeSent(
            (configuredBatriumId === "*") ? msgBatriumId : configuredBatriumId,
            msg.MessageId,
            additionalMessage.message.type,
            additionalMessage.sendRateInMilliseconds,
          )
        ) {
          await this.notify(
            additionalMessage.message,
            additionalMessage.apiPath,
          );
        }
      }
    }
  }
}

module.exports = {
  EmitterController,
};
