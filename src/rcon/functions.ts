import * as amx from "@sa-mp/amx";

export class RconFunctions {
    public static send(command: string): void {
        amx.callNative("SendRconCommand", "s", command);
    }
}