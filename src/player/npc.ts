import * as amx from "@sa-mp/amx";

export namespace NPC {
    export function connect(name: string, script: string): void {
        amx.callNative("ConnectNPC", "ss", name, script);
    }
}