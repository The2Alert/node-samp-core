export interface Position2D {
    x: number;
    y: number;
}

export interface Position extends Position2D {
    z: number;
}

export interface Size {
    width: number;
    height: number;
}