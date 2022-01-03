import * as amx from "@sa-mp/amx";
import {ServerVariable} from "./variable";

export * from "./enums";
export * from "./variable";

export class Server {
    public static get tickCount(): number {
        return amx.callNative("GetTickCount", "").retval;
    }

    public static readonly vars = new Proxy<{[varName: string]: ServerVariable}>({}, {
        get(target, key) {
            return new ServerVariable(String(key));
        },
        deleteProperty(target, key) {
            const variable = new ServerVariable(String(key));
            variable.delete();
            return true;
        }
    });

    public static get varsUpperIndex(): number {
        return amx.callNative("GetSVarsUpperIndex", "").retval;
    }

    public static getVarNameAtIndex(index: number, length: number): string {
        return amx.callNative("GetSVarNameAtIndex", "iSi", index, length, length)[0] as string;
    }

    public static getNetworkStats(length: number): string {
        return amx.callNative("GetNetworkStats", "Si", length, length)[0] as string;
    }

    public static blockIpAddress(ip: string, time: number): boolean {
        return Boolean(amx.callNative("BlockIpAddress", "si", ip, time).retval);
    }

    public static unblockIpAddress(ip: string): boolean {
        return Boolean(amx.callNative("UnBlockIpAddress", "s", ip).retval);
    }

    public static get tickRate(): number {
        return amx.callNative("GetServerTickRate", "").retval;
    }
}