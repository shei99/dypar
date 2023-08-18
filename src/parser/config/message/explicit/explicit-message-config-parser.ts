import { ExplicitMessageConfig } from "../../../../model/message/explicit/explicit-message-config";
import { Parser } from "../../parser";
import {DefaultConfigType} from "../../../../model/default/default-config-type";
import {ExplicitMessageConfigTypeParser} from "./explicit-message-config-type-parser";

export class ExplicitMessageConfigParser implements Parser<Array<ExplicitMessageConfig>> {
  private readonly _explicitMessageConfigTypeParser: ExplicitMessageConfigTypeParser

  constructor(explicitMessageConfigTypeParser: ExplicitMessageConfigTypeParser) {
    this._explicitMessageConfigTypeParser = explicitMessageConfigTypeParser
  }

  parse(yamlConfig: object | undefined): Array<ExplicitMessageConfig> {
    console.log("ExplicitMessageConfigParser", yamlConfig);

    if (yamlConfig === undefined) {
      return [new ExplicitMessageConfig()];
    }
    // @ts-ignore
    const yamlExplicitMessageConfig = yamlConfig.explicit;
    console.log("yamlExplicitMessageConfig", yamlExplicitMessageConfig);
    if (yamlExplicitMessageConfig === undefined) {
      console.log("returned");
      return [new ExplicitMessageConfig()];
    }

    const explicitMessageConfigs: Array<ExplicitMessageConfig> = []
    for (const config of yamlExplicitMessageConfig) {
      console.log("Config", config)
      // @ts-ignore
      explicitMessageConfigs.push(this._explicitMessageConfigTypeParser.parse(config))
    }
    console.log("Explicit Message Config", JSON.stringify(explicitMessageConfigs))

    return explicitMessageConfigs;
  }
}
