import * as amx from "@sa-mp/amx";
import {Position} from "..";

export interface ExplosionOptions extends Position {
    type: number;
    radius: number;
}

export namespace Explosion {
    export function create({x, y, z, type, radius}: ExplosionOptions): void {
        amx.callNative("CreateExplosion", "fffif", x, y, z, type, radius);
    }
}