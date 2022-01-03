import * as amx from "@sa-mp/amx";
import {Player} from ".";

export class NetStats {
    constructor(public readonly player: Player) {}

    public get connectedTime(): number {
        return amx.callNative("NetStats_GetConnectedTime", "i", this.player.id).retval;
    }

    public get messagesReceived(): number {
        return amx.callNative("NetStats_MessagesReceived", "i", this.player.id).retval;
    }

    public get bytesReceived(): number {
        return amx.callNative("NetStats_BytesReceived", "i", this.player.id).retval;
    }

    public get messagesSent(): number {
        return amx.callNative("NetStats_MessagesSent", "i", this.player.id).retval;
    }

    public get bytesSent(): number {
        return amx.callNative("NetStats_BytesSent", "i", this.player.id).retval;
    }

    public get messagesRecvPerSecond(): number {
        return amx.callNative("NetStats_MessagesRecvPerSecond", "i", this.player.id).retval;
    }

    public get packetLossPercent(): number {
        return amx.callNativeInFloat("NetStats_PacketLossPercent", "i", this.player.id).retval;
    }

    public get connectionStatus(): number {
        return amx.callNative("NetStats_ConnectionStatus", "i", this.player.id).retval;
    }

    public get ipPort(): string {
        return amx.callNative("NetStats_GetIpPort", "iSi", this.player.id, 22, 22)[0] as string;
    }
}