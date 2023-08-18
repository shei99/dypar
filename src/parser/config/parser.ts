export interface Parser<Type> {
  parse(yamlConfig: object | undefined): Type;
}
