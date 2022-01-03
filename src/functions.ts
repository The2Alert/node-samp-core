import * as amx from "@sa-mp/amx";
import {Position} from ".";

export function getVectorSize(pos: Position): number {
    const {x, y, z} = pos;
    return amx.callNativeInFloat("VectorSize", "fff", x, y, z).retval;
}

export function setTeamCount(count: number): void {
    amx.callNative("SetTeamCount", "i", count);
}

export function showNameTags(show: boolean): void {
    amx.callNative("ShowNameTags", "i", Number(show));
}

export function disableInteriorEnterExits(): void {
    amx.callNative("DisableInteriorEnterExits", "");
}

export function setNameTagDrawDistance(distance: number): void {
    amx.callNative("SetNameTagDrawDistance", "f", distance);
}

export function setLimitGlobalChatRadius(radius: number): void {
    amx.callNative("LimitGlobalChatRadius", "f", radius);
}