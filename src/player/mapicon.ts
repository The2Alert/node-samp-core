import {Position, MapIconStyle, PlayerMapIconOptions} from "..";

export interface MapIconOptions extends Position {
    type: number;
    color: number;
    style?: MapIconStyle;
}

export class MapIcon implements PlayerMapIconOptions {
    public static poolSize: number = -1;

    public id: number;
    public x: number;
    public y: number;
    public z: number;
    public type: number;
    public color: number;
    public style?: MapIconStyle;

    constructor({x, y, z, type, color, style}: MapIconOptions) {
        this.id = ++MapIcon.poolSize;
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
        this.color = color;
        this.style = style;
    }
}