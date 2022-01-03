import {EventEmitter, DefaultEventMap} from "tsee";
import * as amx from "@sa-mp/amx";
import {RconFunctions} from "./functions";

export * from "./functions";

export interface RconEventMap extends DefaultEventMap {
    command: (rcon: Rcon, cmd: string) => any;
    "login-attempt": (rcon: Rcon, ip: string, password: string, success: boolean) => any;
}

export class Rcon extends RconFunctions {
    public static readonly events: EventEmitter<RconEventMap> = new EventEmitter;
    public static readonly on = Rcon.events.on;

    public static init(): void {
        amx.onPublicCall("OnRconCommand", "s", (cmd) => {
            const rcon = new Rcon;
            return Rcon.emit("command", rcon, rcon, cmd as string);
        });
        amx.onPublicCall("OnRconLoginAttempt", "ssi", (ip, password, success) => {
            const rcon = new Rcon;
            return Rcon.emit("login-attempt", rcon, rcon, ip as string, password as string, Boolean(success));
        });
    }

    public static emit<EventKey extends keyof RconEventMap>(key: EventKey, rcon: Rcon, ...args: Parameters<RconEventMap[EventKey]>): number | void {
        Rcon.events.emit(key, ...args);
        const {retval} = rcon;
        if(typeof retval === "number")
            return retval;
    }

    public retval?: number;
}

Rcon.init();