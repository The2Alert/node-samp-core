import {EventEmitter, DefaultEventMap} from "tsee";
import * as amx from "@sa-mp/amx";
import {Player, Position, VehicleParams, VehicleDoors, VehicleWindows, VehicleDamageStatus, ObjectAttachOptions} from "..";
import {VehicleFunctions, VehiclePlayerOptions} from "./functions";

export * from "./interfaces";
export * from "./enums";
export * from "./functions";

export interface VehicleEventMap extends DefaultEventMap {
    spawn: (vehicle: Vehicle) => any;
    death: (vehicle: Vehicle, killer: Player) => any;
    mod: (player: Player, vehicle: Vehicle, component: number) => any;
    paintjob: (player: Player, vehicle: Vehicle, paintjob: number) => any;
    respray: (player: Player, vehicle: Vehicle, colors: [number, number]) => any;
    "damage-status-update": (vehicle: Vehicle, player: Player) => any;
    "unoccupied-update": (vehicle: Vehicle, player: Player, passengerSeat: number, newPos: Position, velocityPos: Position) => any;
    "stream-in": (vehicle: Vehicle, forPlayer: Player) => any;
    "stream-out": (vehicle: Vehicle, forPlayer: Player) => any;
    "siren-state-change": (player: Player, vehicle: Vehicle, state: boolean) => any;
}

export interface VehicleOptions extends Position {
    model: number;
    rotation: number;
    colors: [number, number];
    respawnDelay?: number;
    siren?: boolean;
    player?: VehiclePlayerOptions;
    params?: VehicleParams;
    doors?: VehicleDoors;
    windows?: VehicleWindows;
    interior?: number;
    components?: number[];
    paintjob?: number;
    health?: number;
    numberPlate?: string;
    velocity?: Position;
    angularVelocity?: Position;
    damageStatus?: VehicleDamageStatus;
    world?: number;
    attach?: ObjectAttachOptions;
    offset?: Position;
}

export class Vehicle extends VehicleFunctions {
    public static readonly events: EventEmitter<VehicleEventMap> = new EventEmitter;
    public static readonly on = Vehicle.events.on;

    public static init(): void {
        amx.onPublicCall("OnVehicleSpawn", "i", (vehicleid) => Vehicle.emitById("spawn", vehicleid as number));
        amx.onPublicCall("OnVehicleDeath", "ii", (vehicleid, killerid) => {
            const vehicle = new Vehicle(vehicleid as number);
            const killer = new Player(killerid as number);
            return Vehicle.emit("death", vehicle, vehicle, killer);
        });
        amx.onPublicCall("OnVehicleMod", "iii", (playerid, vehicleid, componentid) => {
            const player = new Player(playerid as number);
            const vehicle = new Vehicle(vehicleid as number);
            const component = componentid as number;
            return Vehicle.emit("mod", vehicle, player, vehicle, component);
        });
        amx.onPublicCall("OnVehiclePaintjob", "iii", (playerid, vehicleid, paintjobid) => {
            const player = new Player(playerid as number);
            const vehicle = new Vehicle(vehicleid as number);
            const paintjob = paintjobid as number;
            return Vehicle.emit("paintjob", vehicle, player, vehicle, paintjob);
        });
        amx.onPublicCall("OnVehicleRespray", "iiii", (playerid, vehicleid, color1, color2) => {
            const player = new Player(playerid as number);
            const vehicle = new Vehicle(vehicleid as number);
            const colors: [number, number] = [color1 as number, color2 as number];
            return Vehicle.emit("respray", vehicle, player, vehicle, colors);
        });
        amx.onPublicCall("OnVehicleDamageStatusUpdate", "ii", (vehicleid, playerid) => {
            const vehicle = new Vehicle(vehicleid as number);
            const player = new Player(playerid as number);
            return Vehicle.emit("damage-status-update", vehicle, vehicle, player);
        });
        amx.onPublicCall("OnUnoccupiedVehicleUpdate", "iiiffffff", (vehicleid, playerid, passenger_seat, new_x, new_y, new_z, vel_x, vel_y, vel_z) => {
            const vehicle = new Vehicle(vehicleid as number);
            const player = new Player(playerid as number);
            const passengerSeat = passenger_seat as number;
            const newPos: Position = {x: new_x as number, y: new_y as number, z: new_z as number};
            const velocityPos: Position = {x: vel_x as number, y: vel_y as number, z: vel_z as number};
            return Vehicle.emit("unoccupied-update", vehicle, vehicle, player, passengerSeat, newPos, velocityPos);
        });
        amx.onPublicCall("OnVehicleStreamIn", "ii", (vehicleid, forplayerid) => {
            const vehicle = new Vehicle(vehicleid as number);
            const forPlayer = new Player(forplayerid as number);
            return Vehicle.emit("stream-in", vehicle, vehicle, forPlayer);  
        });
        amx.onPublicCall("OnVehicleStreamOut", "ii", (vehicleid, forplayerid) => {
            const vehicle = new Vehicle(vehicleid as number);
            const forPlayer = new Player(forplayerid as number);
            return Vehicle.emit("stream-out", vehicle, vehicle, forPlayer);
        });
        amx.onPublicCall("OnVehicleSirenStateChange", "iii", (playerid, vehicleid, newstate) => {
            const player = new Player(playerid as number);
            const vehicle = new Vehicle(vehicleid as number);
            return Vehicle.emit("siren-state-change", vehicle, player, vehicle, Boolean(newstate));
        });
    }

    public static emit<EventKey extends keyof VehicleEventMap>(key: EventKey, vehicle: Vehicle, ...args: Parameters<VehicleEventMap[EventKey]>): number | void {
        Vehicle.events.emit(key, ...args);
        const {retval} = vehicle;
        if(typeof retval === "number")
            return retval;
    }

    public static emitById<EventKey extends keyof VehicleEventMap>(key: EventKey, id: number): number | void {
        const vehicle = new Vehicle(id);
        return Vehicle.emit<any>(key, vehicle, vehicle);
    }

    public retval?: number;

    constructor(idOrOptions: number | VehicleOptions) {
        super(idOrOptions);
    }
}

Vehicle.init();