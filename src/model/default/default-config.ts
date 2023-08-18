import {DefaultConfigType} from "./default-config-type";

export class DefaultConfig {
    private _explicitConfig: Array<DefaultConfigType> = []
    private _wildcardConfig: DefaultConfigType = new DefaultConfigType()

    setExplicitDefaultConfig(explicitConfig: Array<DefaultConfigType>): DefaultConfig {
        this._explicitConfig = explicitConfig
        return this
    }

    setWildcardDefaultConfig(wildcardConfig: DefaultConfigType): DefaultConfig {
        this._wildcardConfig = wildcardConfig
        return this
    }
}