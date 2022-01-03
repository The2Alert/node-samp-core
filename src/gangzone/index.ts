import * as amx from "@sa-mp/amx";
import {constants, Position2D, Player} from "..";

export interface GangZoneOptions {
    min: Position2D;
    max: Position2D;
}

export class GangZone {
    public static create(options: GangZoneOptions): GangZone {
        const zone = new GangZone(options);
        return zone.create();
    }

    public static getById(id: number): GangZone {
        return new GangZone(id);
    }

    public id: number = constants.INVALID_GANG_ZONE;

    constructor(public readonly idOrOptions: number | GangZoneOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): GangZone {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: GangZoneOptions = this.idOrOptions;
        const {min, max} = options;
        this.id = amx.callNative("GangZoneCreate", "ffff", min.x, min.y, max.x, max.y).retval;
        return this;
    }

    public destroy(): void {
        amx.callNative("GangZoneDestroy", "i", this.id);
    }

    public show(player: Player, color: number = 0xFFFFFFAA): boolean {
        return Boolean(amx.callNative("GangZoneShowForPlayer", "iii", player.id, this.id, color).retval);
    }

    public showForAll(color: number = 0xFFFFFFAA): boolean {
        return Boolean(amx.callNative("GangZoneShowForAll", "ii", this.id, color).retval);
    }

    public hide(player: Player): void {
        amx.callNative("GangZoneHideForPlayer", "ii", player.id, this.id);
    }

    public hideForAll(): void {
        amx.callNative("GangZoneHideForAll", "i", this.id);
    }

    public flash(player: Player, color: number = 0xFFFFFFAA): void {
        amx.callNative("GangZoneFlashForPlayer", "iii", player.id, this.id, color);
    }

    public flashForAll(color: number = 0xFFFFFFAA): void {
        amx.callNative("GangZoneFlashForAll", "ii", this.id, color);
    }

    public stopFlash(player: Player): void {
        amx.callNative("GangZoneStopFlashForPlayer", "ii", player.id, this.id);
    }

    public stopFlashForAll(): boolean {
        return Boolean(amx.callNative("GangZoneStopFlashForAll", "i", this.id).retval);
    }
}