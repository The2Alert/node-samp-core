import {EventEmitter, DefaultEventMap} from "tsee";
import * as amx from "@sa-mp/amx";
import {PlayerFunctions} from "./functions";
import {Weapons, Vehicle, SampObject, Pickup, Actor, Position, TextDraw, PlayerTextDraw} from "..";
import {PlayerDisconnectReasons, PlayerStates, ClickSources, EditObjectResponse, SelectObjectTypes, BulletHitTypes} from "./enums";
import {command} from "./command";
import {CommandEventMap} from "./command/types";
import {key} from "./key";
import {DialogResponseCallback} from "./dialog/response";

export * from "./interfaces";
export * from "./enums";
export * from "./functions";
export * from "./netstats";
export * from "./dialog";
export * from "./variable";
export * from "./mapicon";
export * from "./npc";
export {Command, CommandList} from "./command";
export * from "./command/types";
export {Key, KeyHandler} from "./key";

export interface PlayerEventMap extends DefaultEventMap, CommandEventMap {
    connect: (player: Player) => any;
    disconnect: (player: Player, reason: PlayerDisconnectReasons) => any;
    spawn: (player: Player) => any;
    death: (player: Player, killer: Player, reason: Weapons) => any;
    text: (player: Player, text: string) => any;
    "command-text": (player: Player, cmdText: string) => any;
    "request-class": (player: Player, classId: number) => any;
    "enter-vehicle": (player: Player, vehicle: Vehicle, isPassenger: boolean) => any;
    "exit-vehicle": (player: Player, vehicle: Vehicle) => any;
    "state-change": (player: Player, newState: PlayerStates, oldState: PlayerStates) => any;
    "enter-checkpoint": (player: Player) => any;
    "leave-checkpoint": (player: Player) => any;
    "enter-race-checkpoint": (player: Player) => any;
    "leave-race-checkpoint": (player: Player) => any;
    "request-spawn": (player: Player) => any;
    "object-moved": (player: Player, object: SampObject) => any;
    "pick-up-pickup": (player: Player, pickup: Pickup) => any;
    "enter-exit-mod-shop": (player: Player, entered: boolean, interior: number) => any;
    "selected-menu-row": (player: Player, row: number) => any;
    "exited-menu": (player: Player) => any;
    "interior-change": (player: Player, newInterior: number, oldInterior: number) => any;
    "key-state-change": (player: Player, newKeys: number, oldKeys: number) => any;
    update: (player: Player) => any;
    "stream-in": (player: Player, forPlayer: Player) => any;
    "stream-out": (player: Player, forPlayer: Player) => any;
    "dialog-response": DialogResponseCallback;
    "take-damage": (player: Player, issuer: Player, amount: number, weapon: Weapons, bodyPart: number) => any;
    "give-damage": (player: Player, damaged: Player, amount: number, weapon: Weapons, bodyPart: number) => any;
    "give-damage-actor": (player: Player, damaged: Actor, amount: number, weapon: Weapons, bodyPart: number) => any;
    "click-map": (player: Player, pos: Position) => any;
    "click-textdraw": (player: Player, clicked: TextDraw) => any;
    "click-playertextdraw": (player: Player, clicked: PlayerTextDraw) => any;
    "incoming-connection": (player: Player, ip: string, port: number) => any;
    "trailer-update": (player: Player, vehicle: Vehicle) => any;
    "click-player": (player: Player, clicked: Player, source: ClickSources) => any;
    "edit-object": (player: Player, isPlayerObject: boolean, object: SampObject, response: EditObjectResponse, offset: Position, rot: Position) => any;
    "edit-attached-object": (player: Player, response: boolean, index: number, model: number, bone: number, offset: Position, rot: Position, scale: Position) => any;
    "select-object": (player: Player, type: SelectObjectTypes, object: SampObject, model: number, pos: Position) => any;
    "weapon-shot": (player: Player, weapon: Weapons, hitType: BulletHitTypes, hitId: number, coord: Position) => any;
}

export class Player extends PlayerFunctions {
    public static readonly events: EventEmitter<PlayerEventMap> = new EventEmitter;
    public static readonly on = Player.events.on;

    public static init(): void {
        amx.onPublicCall("OnPlayerConnect", "i", (playerid) => Player.emitById("connect", playerid as number));
        amx.onPublicCall("OnPlayerDisconnect", "ii", (playerid, reason) => {
            const player = new Player(playerid as number);
            return Player.emit("disconnect", player, player, reason as PlayerDisconnectReasons);
        });
        amx.onPublicCall("OnPlayerSpawn", "i", (playerid) => Player.emitById("spawn", playerid as number));
        amx.onPublicCall("OnPlayerDeath", "iii", (playerid, killerid, reason) => {
            const player = new Player(playerid as number);
            const killer = new Player(killerid as number);
            return Player.emit("death", player, player, killer, reason as Weapons);
        });
        amx.onPublicCall("OnPlayerText", "is", (playerid, text) => {
            const player = new Player(playerid as number);
            return Player.emit("text", player, player, text as string);
        });
        amx.onPublicCall("OnPlayerCommandText", "is", (playerid, cmdtext) => {
            const player = new Player(playerid as number);
            return Player.emit("command-text", player, player, cmdtext as string);
        });
        amx.onPublicCall("OnPlayerRequestClass", "ii", (playerid, classid) => {
            const player = new Player(playerid as number);
            return Player.emit("request-class", player, player, classid as number);
        });
        amx.onPublicCall("OnPlayerEnterVehicle", "iii", (playerid, vehicleid, ispassenger) => {
            const player = new Player(playerid as number);
            const vehicle = new Vehicle(vehicleid as number);
            const isPassenger: boolean = Boolean(ispassenger);
            return Player.emit("enter-vehicle", player, player, vehicle, isPassenger);
        });
        amx.onPublicCall("OnPlayerExitVehicle", "ii", (playerid, vehicleid) => {
            const player = new Player(playerid as number);
            const vehicle = new Vehicle(vehicleid as number);
            return Player.emit("exit-vehicle", player, player, vehicle);
        });
        amx.onPublicCall("OnPlayerStateChange", "iii", (playerid, newstate, oldstate) => {
            const player = new Player(playerid as number);
            const newState = newstate as PlayerStates;
            const oldState = oldstate as PlayerStates;
            return Player.emit("state-change", player, player, newState, oldState);
        });
        amx.onPublicCall("OnPlayerEnterCheckpoint", "i", (playerid) => Player.emitById("enter-checkpoint", playerid as number));
        amx.onPublicCall("OnPlayerLeaveCheckpoint", "i", (playerid) => Player.emitById("leave-checkpoint", playerid as number));
        amx.onPublicCall("OnPlayerEnterRaceCheckpoint", "i", (playerid) => Player.emitById("enter-race-checkpoint", playerid as number));
        amx.onPublicCall("OnPlayerLeaveRaceCheckpoint", "i", (playerid) => Player.emitById("leave-race-checkpoint", playerid as number));
        amx.onPublicCall("OnPlayerRequestSpawn", "i", (playerid) => Player.emitById("request-spawn", playerid as number));
        amx.onPublicCall("OnPlayerObjectMoved", "ii", (playerid, objectid) => {
            const player = new Player(playerid as number);
            const object = new SampObject(objectid as number);
            return Player.emit("object-moved", player, player, object);
        });
        amx.onPublicCall("OnPlayerPickUpPickup", "ii", (playerid, pickupid) => {
            const player = new Player(playerid as number);
            const pickup = new Pickup(pickupid as number);
            return Player.emit("pick-up-pickup", player, player, pickup);
        });
        amx.onPublicCall("OnEnterExitModShop", "iii", (playerid, enterexit, interiorid) => {
            const player = new Player(playerid as number);
            const entered: boolean = Boolean(enterexit);
            const interior = interiorid as number;
            return Player.emit("enter-exit-mod-shop", player, player, entered, interior);
        });
        amx.onPublicCall("OnPlayerSelectedMenuRow", "ii", (playerid, row) => {
            const player = new Player(playerid as number);
            return Player.emit("selected-menu-row", player, player, row as number);
        });
        amx.onPublicCall("OnPlayerExitedMenu", "i", (playerid) => Player.emitById("exited-menu", playerid as number));
        amx.onPublicCall("OnPlayerInteriorChange", "iii", (playerid, newinteriorid, oldinteriorid) => {
            const player = new Player(playerid as number);
            const newInterior = newinteriorid as number;
            const oldInterior = oldinteriorid as number;
            return Player.emit("interior-change", player, player, newInterior, oldInterior);
        });
        amx.onPublicCall("OnPlayerKeyStateChange", "iii", (playerid, newkeys, oldkeys) => {
            const player = new Player(playerid as number);
            const newKeys = newkeys as number;
            const oldKeys = oldkeys as number;
            return Player.emit("key-state-change", player, player, newKeys, oldKeys);
        });
        amx.onPublicCall("OnPlayerUpdate", "i", (playerid) => Player.emitById("update", playerid as number));
        amx.onPublicCall("OnPlayerStreamIn", "ii", (playerid, forplayerid) => {
            const player = new Player(playerid as number);
            const forPlayer = new Player(forplayerid as number);
            return Player.emit("stream-in", player, player, forPlayer);
        });
        amx.onPublicCall("OnPlayerStreamOut", "ii", (playerid, forplayerid) => {
            const player = new Player(playerid as number);
            const forPlayer = new Player(forplayerid as number);
            return Player.emit("stream-out", player, player, forPlayer);
        });
        amx.onPublicCall("OnDialogResponse", "iiiis", (playerid, dialogid, response, listitem, inputtext) => {
            const player = new Player(playerid as number);
            return Player.emit(
                "dialog-response", 
                player, 
                player, 
                {
                    id: dialogid as number, 
                    response: Boolean(response), 
                    item: listitem as number, 
                    inputText: inputtext as string
                }
            );
        });
        amx.onPublicCall("OnPlayerTakeDamage", "iifii", (playerid, issuerid, amount, weaponid, bodypart) => {
            const player = new Player(playerid as number);
            const issuer = new Player(issuerid as number);
            return Player.emit("take-damage", player, player, issuer, amount as number, weaponid as Weapons, bodypart as number);
        });
        amx.onPublicCall("OnPlayerGiveDamage", "iifii", (playerid, damagedid, amount, weaponid, bodypart) => {
            const player = new Player(playerid as number);
            const damaged = new Player(damagedid as number);
            return Player.emit("give-damage", player, player, damaged, amount as number, weaponid as Weapons, bodypart as number);
        });
        amx.onPublicCall("OnPlayerGiveDamageActor", "iifii", (playerid, damaged_actorid, amount, weaponid, bodypart) => {
            const player = new Player(playerid as number);
            const damaged = new Actor(damaged_actorid as number);
            return Player.emit("give-damage-actor", player, player, damaged, amount as number, weaponid as Weapons, bodypart as number);
        });
        amx.onPublicCall("OnPlayerClickMap", "ifff", (playerid, fX, fY, fZ) => {
            const player = new Player(playerid as number);
            const pos: Position = {x: fX as number, y: fY as number, z: fZ as number};
            return Player.emit("click-map", player, player, pos);
        });
        amx.onPublicCall("OnPlayerClickTextDraw", "ii", (playerid, clickedid) => {
            const player = new Player(playerid as number);
            const clicked = new TextDraw(clickedid as number);
            return Player.emit("click-textdraw", player, player, clicked);
        });
        amx.onPublicCall("OnPlayerClickPlayerTextDraw", "ii", (playerid, playertextid) => {
            const player = new Player(playerid as number);
            const clicked = new PlayerTextDraw(playertextid as number, player);
            return Player.emit("click-playertextdraw", player, player, clicked);
        });
        amx.onPublicCall("OnIncomingConnection", "isi", (playerid, ip_address, port) => {
            const player = new Player(playerid as number);
            return Player.emit("incoming-connection", player, player, ip_address as string, port as number);
        });
        amx.onPublicCall("OnTrailerUpdate", "ii", (playerid, vehicleid) => {
            const player = new Player(playerid as number);
            const vehicle = new Vehicle(vehicleid as number);
            return Player.emit("trailer-update", player, player, vehicle);
        });
        amx.onPublicCall("OnPlayerClickPlayer", "iii", (playerid, clickedplayerid, source) => {
            const player = new Player(playerid as number);
            const clicked = new Player(clickedplayerid as number);
            return Player.emit("click-player", player, player, clicked, source as ClickSources);
        });
        amx.onPublicCall("OnPlayerEditObject", "iiiiffffff", (playerid, playerobject, objectid, response, fX, fY, fZ, fRotX, fRotY, fRotZ) => {
            const player = new Player(playerid as number);
            const isPlayerObject = Boolean(playerobject);
            const object = new SampObject(objectid as number);
            const offset: Position = {x: fX as number, y: fY as number, z: fZ as number};
            const rot: Position = {x: fRotX as number, y: fRotY as number, z: fRotZ as number};
            return Player.emit("edit-object", player, player, isPlayerObject, object, response as EditObjectResponse, offset, rot);
        });
        amx.onPublicCall("OnPlayerEditAttachedObject", "iiiiifffffffff", (playerid, response, index, modelid, boneid, fOffsetX, fOffsetY, fOffsetZ, fRotX, fRotY, fRotZ, fScaleX, fScaleY, fScaleZ) => {
            const player = new Player(playerid as number);
            const offset: Position = {x: fOffsetX as number, y: fOffsetY as number, z: fOffsetZ as number};
            const rot: Position = {x: fRotX as number, y: fRotY as number, z: fRotZ as number};
            const scale: Position = {x: fScaleX as number, y: fScaleY as number, z: fScaleZ as number};
            return Player.emit("edit-attached-object", player, player, Boolean(response), index as number, modelid as number, boneid as number, offset, rot, scale);
        });
        amx.onPublicCall("OnPlayerSelectObject", "iiiifff", (playerid, type, objectid, modelid, fX, fY, fZ) => {
            const player = new Player(playerid as number);
            const pos: Position = {x: fX as number, y: fY as number, z: fZ as number};
            const object = new SampObject(objectid as number);
            return Player.emit("select-object", player, player, type as SelectObjectTypes, object, modelid as number, pos);
        });
        amx.onPublicCall("OnPlayerWeaponShot", "iiiifff", (playerid, weaponid, hittype, hitid, fX, fY, fZ) => {
            const player = new Player(playerid as number);
            const coord: Position = {x: fX as number, y: fY as number, z: fZ as number};
            return Player.emit("weapon-shot", player, player, weaponid as Weapons, hittype as BulletHitTypes, hitid as number, coord);
        });
    }

    public static emit<EventKey extends keyof PlayerEventMap>(key: EventKey, player: Player, ...args: Parameters<PlayerEventMap[EventKey]>): number | void {
        Player.events.emit(key, ...args);
        const {retval} = player;
        if(typeof retval === "number")
            return retval;
    }

    public static emitById<EventKey extends keyof PlayerEventMap>(key: EventKey, id: number): number | void {
        const player = new Player(id);
        return Player.emit<any>(key, player, player);
    }

    public static getById(id: number): Player {
        return new Player(id);
    }

    public static readonly command = command;
    public static readonly key = key;

    public retval?: number;

    constructor(id: number) {
        super(id);
    }
}

import {
    Factory as PlayerFactory, 
    PersonalFactory as PlayerPersonalFactory, 
    Context as PlayerContext, 
    ContextCommand as PlayerContextCommand,
    ContextKey as PlayerContextKey,
    ContextDialog as PlayerContextDialog,
    ContextEvents as PlayerContextEvents,
    Service as PlayerService,
    Extension as PlayerExtension
} from "./context";

export namespace Player {
    export const Factory = PlayerFactory;
    export type PersonalFactory = PlayerPersonalFactory;
    export const Context = PlayerContext;
    export type ContextCommand = PlayerContextCommand;
    export type ContextKey = PlayerContextKey;
    export type ContextDialog = PlayerContextDialog;
    export type ContextEvents = PlayerContextEvents;
    export const Service = PlayerService;
    export const Extension = PlayerExtension;
}

Player.init();