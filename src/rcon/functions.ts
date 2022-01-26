import * as amx from "@sa-mp/amx";
import {Rcon} from ".";

export class RconFunctions {
    public static send(command: string): void {
        amx.callNative("SendRconCommand", "s", command);
    }

    public send(command: string): void {
        Rcon.send(command);
    }
}