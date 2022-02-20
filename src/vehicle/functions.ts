import * as amx from "@sa-mp/amx";
import {Vehicle, VehicleOptions, Position, Player, VehicleRotationQuat, VehicleParams, VehicleDoors, VehicleWindows, VehicleComponentSlots, VehicleDamageStatus, VehicleModelInfoTypes, constants} from "..";

export interface AddStaticVehicleOptions {
    model: number;
    spawn: Position;
    angle: number;
    colors: [number, number];
}

export interface AddStaticVehicleExOptions extends AddStaticVehicleOptions {
    respawnDelay: number;
    siren: boolean;
}

export interface VehiclePlayerOptions {
    player: Player;
    objective: boolean;
    doorsLocked: boolean;
}

export class VehicleFunctions {
    public static get poolSize(): number {
        return amx.callNative("GetVehiclePoolSize", "").retval;
    }

    public static addStatic({model, spawn, angle, colors}: AddStaticVehicleOptions): Vehicle {
        const modelid = model;
        const {x: spawn_x, y: spawn_y, z: spawn_z} = spawn;
        const z_angle = angle;
        const [color1, color2] = colors;
        const id: number = amx.callNative("AddStaticVehicle", "iffffii", modelid, spawn_x, spawn_y, spawn_z, z_angle, color1, color2).retval;
        return new Vehicle(id);
    }

    public static addStaticEx({model, spawn, angle, colors, respawnDelay, siren}: AddStaticVehicleExOptions): Vehicle {
        const modelid = model;
        const {x: spawn_x, y: spawn_y, z: spawn_z} = spawn;
        const z_angle = angle;
        const [color1, color2] = colors;
        const respawn_delay = respawnDelay;
        const addsiren = Number(siren);
        const id: number = amx.callNative("AddStaticVehicleEx", "iffffiiii", modelid, spawn_x, spawn_y, spawn_z, z_angle, color1, color2, respawn_delay, addsiren).retval;
        return new Vehicle(id);
    }

    public static enableFriendlyFire(): void {
        amx.callNative("EnableVehicleFriendlyFire", "");
    }

    public static create(options: VehicleOptions): Vehicle {
        const vehicle = new Vehicle(options);
        return vehicle.create();
    }

    public static getById(id: number): Vehicle {
        return new Vehicle(id);
    }

    public static manualEngineAndLights(): void {
        amx.callNative("ManualVehicleEngineAndLights", "");
    }

    public static modelInfo(model: number, type: VehicleModelInfoTypes): Position {
        const [x, y, z] = amx.callNative("GetVehicleModelInfo", "iiFFF", model, type) as number[];
        return {x, y, z};
    }

    public static getComponentType(component: number): VehicleComponentSlots {
        return amx.callNative("GetVehicleComponentType", "i", component).retval;
    }

    public id: number = constants.INVALID_VEHICLE_ID;

    constructor(public readonly idOrOptions: number | VehicleOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): Vehicle {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: VehicleOptions = this.idOrOptions;
        const {model, x, y, z, rotation, colors: [color1, color2], respawnDelay = -1, siren = false, player, params, doors, windows, interior, components, paintjob, health, numberPlate, velocity, angularVelocity, damageStatus, world} = options;
        this.id = amx.callNative("CreateVehicle", "iffffiiii", model, x, y, z, rotation, color1, color2, respawnDelay, Number(siren)).retval;
        if(player !== undefined)
            this.player(player); 
        if(params !== undefined)
            this.params = params; 
        if(doors !== undefined)
            this.doors = doors; 
        if(windows !== undefined)
            this.windows = windows; 
        if(interior !== undefined)
            this.interior = interior; 
        if(components !== undefined) {
            for(const component of components)
                this.addComponent(component);
        }
        if(paintjob !== undefined)
            this.paintjob = paintjob; 
        if(health !== undefined)
            this.health = health; 
        if(numberPlate !== undefined)
            this.numberPlate = numberPlate; 
        if(velocity !== undefined)
            this.velocity = velocity; 
        if(angularVelocity !== undefined)
            this.angularVelocity = angularVelocity; 
        if(damageStatus !== undefined)
            this.damageStatus = damageStatus; 
        if(world !== undefined)
            this.world = world;
        return this;
    }

    public destroy(): boolean {
        return Boolean(amx.callNative("DestroyVehicle", "i", this.id).retval);
    }

    public isStreamedIn(forPlayer: Player): boolean {
        return Boolean(amx.callNative("IsVehicleStreamedIn", "ii", this.id, forPlayer.id).retval);
    }

    public get pos(): Position {
        const [x, y, z] = amx.callNative("GetVehiclePos", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public set pos({x, y, z}: Position) {
        amx.callNative("SetVehiclePos", "ifff", this.id, x, y, z);
    }

    public get angle(): number {
        return amx.callNative("GetVehicleZAngle", "iF", this.id)[0] as number;
    }

    public set angle(angle: number) {
        amx.callNative("SetVehicleZAngle", "if", this.id, angle);
    }

    public get rotationQuat(): VehicleRotationQuat {
        const [w, x, y, z] = amx.callNative("GetVehicleRotationQuat", "iFFFF", this.id) as number[];
        return {w, x, y, z};
    }

    public distanceFromPoint({x, y, z}: Position): number {
        return amx.callNativeInFloat("GetVehicleDistanceFromPoint", "ifff", this.id, x, y, z).retval;
    }

    public player({player, objective, doorsLocked}: VehiclePlayerOptions): boolean {
        return Boolean(amx.callNative("SetVehicleParamsForPlayer", "iiii", this.id, player.id, Number(objective), Number(doorsLocked)).retval);
    }

    public set params({engine, lights, alarm, doors, bonnet, boot, objective}: VehicleParams) {
        amx.callNative("SetVehicleParamsEx", "iiiiiiii", this.id, Number(engine), Number(lights), Number(alarm), Number(doors), Number(bonnet), Number(boot), Number(objective));
    }

    public get params(): VehicleParams {
        const [engine, lights, alarm, doors, bonnet, boot, objective] = amx.callNative("GetVehicleParamsEx", "iIIIIIII", this.id).map(Boolean);
        return {engine, lights, alarm, doors, bonnet, boot, objective};
    }

    public get siren(): number {
        return amx.callNative("GetVehicleParamsSirenState", "i", this.id).retval;
    }

    public set doors({driver, passenger, backLeft, backRight}: VehicleDoors) {
        amx.callNative("SetVehicleParamsCarDoors", "iiiii", this.id, Number(driver), Number(passenger), Number(backLeft), Number(backRight));
    }

    public get doors(): VehicleDoors {
        const [driver, passenger, backLeft, backRight] = amx.callNative("GetVehicleParamsCarDoors", "iIIII", this.id).map(Boolean);
        return {driver, passenger, backLeft, backRight};
    }

    public set windows({driver, passenger, backLeft, backRight}: VehicleWindows) {
        amx.callNative("SetVehicleParamsCarWindows", "iiiii", this.id, Number(driver), Number(passenger), Number(backLeft), Number(backRight));
    }

    public get windows(): VehicleWindows {
        const [driver, passenger, backLeft, backRight] = amx.callNative("GetVehicleParamsCarWindows", "iIIII", this.id).map(Boolean);
        return {driver, passenger, backLeft, backRight};
    }

    public respawn(): boolean {
        return Boolean(amx.callNative("SetVehicleToRespawn", "i", this.id).retval);
    }

    public set interior(interior: number) {
        amx.callNative("LinkVehicleToInterior", "ii", this.id, interior);
    }

    public addComponent(component: number): boolean {
        return Boolean(amx.callNative("AddVehicleComponent", "ii", this.id, component).retval);
    }

    public removeComponent(component: number): void {
        amx.callNative("RemoveVehicleComponent", "ii", this.id, component);
    }

    public set colors([color1, color2]: [number, number]) {
        amx.callNative("ChangeVehicleColor", "iii", this.id, color1, color2);
    }

    public set paintjob(paintjob: number) {
        amx.callNative("ChangeVehiclePaintjob", "ii", this.id, paintjob);
    }

    public set health(health: number) {
        amx.callNative("SetVehicleHealth", "if", this.id, health);
    }

    public get health(): number {
        return amx.callNative("GetVehicleHealth", "iF", this.id)[0] as number;
    }

    public attachTrailer(trailer: Vehicle): void {
        amx.callNative("AttachTrailerToVehicle", "ii", trailer.id, this.id);
    }

    public detachTrailer(): void {
        amx.callNative("DetachTrailerFromVehicle", "i", this.id);
    }

    public isTrailerAttached(): boolean {
        return Boolean(amx.callNative("IsTrailerAttachedToVehicle", "i", this.id).retval);
    }

    public trailer(): Vehicle {
        return new Vehicle(amx.callNative("GetVehicleTrailer", "i", this.id).retval);
    }

    public set numberPlate(numberPlate: string) {
        amx.callNative("SetVehicleNumberPlate", "is", this.id, numberPlate);
    }

    public get model(): number {
        return amx.callNative("GetVehicleModel", "i", this.id).retval;
    }

    public getComponentInSlot(slot: VehicleComponentSlots): number {
        return amx.callNative("GetVehicleComponentInSlot", "ii", this.id, slot).retval;
    }

    public repair(): boolean {
        return Boolean(amx.callNative("RepairVehicle", "i", this.id).retval);
    }

    public get velocity(): Position {
        const [x, y, z] = amx.callNative("GetVehicleVelocity", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public set velocity({x, y, z}: Position) {
        amx.callNative("SetVehicleVelocity", "ifff", this.id, x, y, z);
    }

    public set angularVelocity({x, y, z}: Position) {
        amx.callNative("SetVehicleAngularVelocity", "ifff", this.id, x, y, z);
    }

    public get damageStatus(): VehicleDamageStatus {
        const [panels, doors, lights, tires] = amx.callNative("GetVehicleDamageStatus", "iIIII", this.id) as number[];
        return {panels, doors, lights, tires};
    }

    public set damageStatus({panels, doors, lights, tires}: VehicleDamageStatus) {
        amx.callNative("UpdateVehicleDamageStatus", "iiiii", this.id, panels, doors, lights, tires);
    }

    public set world(world: number) {
        amx.callNative("SetVehicleVirtualWorld", "ii", this.id, world);
    }

    public get world(): number {
        return amx.callNative("GetVehicleVirtualWorld", "i", this.id).retval;
    }

    public is(vehicle: Vehicle): boolean {
        return this.id === vehicle.id;
    }
}