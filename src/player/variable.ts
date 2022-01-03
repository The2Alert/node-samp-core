import * as amx from "@sa-mp/amx";
import {Player, PlayerVariableTypes} from ".";

export class PlayerVariable {
    constructor(public readonly player: Player, public readonly name: string) {}

    public setInt(value: number): boolean {
        return Boolean(amx.callNative("SetPVarInt", "isi", this.player.id, this.name, value).retval);
    }

    public getInt(): number {
        return amx.callNative("GetPVarInt", "is", this.player.id, this.name).retval;
    }

    public setString(value: string): void {
        amx.callNative("SetPVarString", "iss", this.player.id, this.name, value);
    }

    public getString(length: number): string {
        return amx.callNative("GetPVarString", "isSi", this.player.id, this.name, length, length)[0] as string;
    }

    public setFloat(value: number): boolean {
        return Boolean(amx.callNative("SetPVarFloat", "isf", this.player.id, this.name, value).retval);
    }

    public getFloat(): number {
        return amx.callNativeInFloat("GetPVarFloat", "is", this.player.id, this.name).retval;
    }

    public delete(): boolean {
        return Boolean(amx.callNative("DeletePVar", "is", this.player.id, this.name).retval);
    }

    public get type(): PlayerVariableTypes {
        return amx.callNative("GetPVarType", "is", this.player.id, this.name).retval;
    }
}