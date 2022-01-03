import {Weapons, Keys, Position} from "..";

export interface Weapon {
    type: Weapons;
    ammo: number;
}

export interface IKeys {
    keys: number;
    upDown: Keys;
    leftRight: Keys;
}

export interface PlayerTime {
    hour: number;
    minute: number;
}

export interface PlayerShot {
    origin: Position;
    hit: Position; 
}

export interface AnimationName {
    library: string;
    name: string;
}