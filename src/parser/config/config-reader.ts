import * as fs from "fs";
import YAML from "yaml";

export class ConfigReader {
  readConfig(relativConfigPath: string) {
    try {
      const file = fs.readFileSync(relativConfigPath, "utf8");
      return YAML.parse(file);
    } catch (e) {
      console.log(
        `Could not load file at ${relativConfigPath}, error ${e}`,
      );
      process.exit(1);
    }
  }
}
