import * as amx from "@sa-mp/amx";
import {ServerVariableTypes} from "./enums";

export class ServerVariable {
    constructor(public readonly name: string) {}

    public setInt(value: number): boolean {
        return Boolean(amx.callNative("SetSVarInt", "si", this.name, value).retval);
    }

    public getInt(): number {
        return amx.callNative("GetSVarInt", "s", this.name).retval;
    }

    public setString(value: string): boolean {
        return Boolean(amx.callNative("SetSVarString", "ss", this.name, value).retval);
    }

    public getString(length: number): string {
        return amx.callNative("GetSVarString", "sSi", this.name, length, length)[0] as string;
    }

    public setFloat(value: number): boolean {
        return Boolean(amx.callNative("SetSVarFloat", "sf", this.name, value).retval);
    }

    public getFloat(): number {
        return amx.callNativeInFloat("GetSVarFloat", "s", this.name).retval;
    }

    public delete(): boolean {
        return Boolean(amx.callNative("DeleteSVar", "s", this.name).retval);
    }

    public get type(): ServerVariableTypes {
        return amx.callNative("GetSVarType", "s", this.name).retval;
    }
}