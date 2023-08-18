import { ConfigReader } from "./parser/config/config-reader";
import { DyparConfigParser } from "./parser/config/dypar-parser";

const configReader = new ConfigReader();

const dyparConfigParser = new DyparConfigParser("config/final-config.yml");

console.log(JSON.stringify(dyparConfigParser.defaultConfig));

// console.log(JSON.stringify(configReader.readConfig("config/final-config.yml")));
