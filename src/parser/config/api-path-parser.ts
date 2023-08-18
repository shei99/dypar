import { Parser } from "./parser";
import { ApiPath } from "../../model/api-path";

export class ApiPathParser implements Parser<ApiPath> {
  parse(yamlConfig: object | undefined): ApiPath {
    console.log("Api Path Parser, yaml config", yamlConfig)
    let apiPath = new ApiPath();
    if (yamlConfig === undefined) {
      return apiPath;
    }
    // @ts-ignore
    apiPath.setHttp(yamlConfig.http).setTopic(yamlConfig.topic);
    return apiPath;
  }
}
