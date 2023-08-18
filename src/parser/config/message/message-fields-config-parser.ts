import {FieldConfig} from "../../../model/field-config";
import {Parser} from "../parser";

export class MessageFieldsConfigParser implements Parser<Array<FieldConfig>> {
    parse(yamlConfig: object | undefined): Array<FieldConfig> {
        return undefined;
    }

}