import * as ctx from "ctx-api";
import {Extension} from ".";
import {GameMode, Actor, SampObject, Player, Rcon, Vehicle} from "../..";
import {Context} from "./context";
import {ContextEvents} from "./context-events";
import {PersonalFactory} from "./personal-factory";

export class Factory extends ctx.Factory {
    public static create(rootContextClass: typeof Context, extensionsClasses?: (typeof Extension)[]): Factory {
        const factory = new Factory(rootContextClass, extensionsClasses);
        factory.create();
        return factory;
    }

    public createPersonal(): PersonalFactory {
        return this.createPersonalById(0, []);
    }

    public getPersonal(): PersonalFactory {
        return this.getPersonalById(0);
    }

    public removePersonal(): void {
        return this.removePersonalById(0);
    }

    public callEvent<EventName extends keyof ContextEvents>(name: EventName, ...args: Parameters<ContextEvents[EventName]>): number | undefined {
        return this.getPersonal().callEvent(name, ...args);
    }

    public create(): void {
        super.create();
        GameMode.on("init", (gamemode) => {
            this.createPersonal();
            gamemode.retval = this.callEvent("onInit");
        });
        GameMode.on("exit", (gamemode) => {
            gamemode.retval = this.callEvent("onExit");
            this.removePersonal();
        });
        Actor.on("stream-in", (actor, forPlayer) => {
            actor.retval = this.callEvent("onActorStreamIn", actor, forPlayer);
        });
        Actor.on("stream-out", (actor, forPlayer) => {
            actor.retval = this.callEvent("onActorStreamOut", actor, forPlayer);
        });
        SampObject.on("moved", (object) => {
            object.retval = this.callEvent("onObjectMoved", object);
        });
        Player.on("connect", (player) => {
            player.retval = this.callEvent("onPlayerConnect", player);
        });
        Player.on("disconnect", (player, reason) => {
            player.retval = this.callEvent("onPlayerDisconnect", player, reason);
        });
        Player.on("spawn", (player) => {
            player.retval = this.callEvent("onPlayerSpawn", player);
        });
        Player.on("death", (player, killer, reason) => {
            player.retval = this.callEvent("onPlayerDeath", player, killer, reason);
        });
        Player.on("text", (player, text) => {
            player.retval = this.callEvent("onPlayerText", player, text);
        });
        Player.on("command-text", (player, cmdText) => {
            player.retval = this.callEvent("onPlayerCommandText", player, cmdText);
        });
        Player.on("request-class", (player, classId) => {
            player.retval = this.callEvent("onPlayerRequestClass", player, classId);
        });
        Player.on("enter-vehicle", (player, vehicle, isPassenger) => {
            player.retval = this.callEvent("onPlayerEnterVehicle", player, vehicle, isPassenger);
        });
        Player.on("exit-vehicle", (player, vehicle) => {
            player.retval = this.callEvent("onPlayerExitVehicle", player, vehicle);
        });
        Player.on("state-change", (player, newState, oldState) => {
            player.retval = this.callEvent("onPlayerStateChange", player, newState, oldState);
        });
        Player.on("enter-checkpoint", (player) => {
            player.retval = this.callEvent("onPlayerEnterCheckpoint", player);
        });
        Player.on("leave-checkpoint", (player) => {
            player.retval = this.callEvent("onPlayerLeaveCheckpoint", player);
        });
        Player.on("enter-race-checkpoint", (player) => {
            player.retval = this.callEvent("onPlayerEnterRaceCheckpoint", player);
        });
        Player.on("leave-race-checkpoint", (player) => {
            player.retval = this.callEvent("onPlayerLeaveRaceCheckpoint", player);
        });
        Player.on("request-spawn", (player) => {
            player.retval = this.callEvent("onPlayerRequestSpawn", player);
        });
        Player.on("object-moved", (player, object) => {
            player.retval = this.callEvent("onPlayerObjectMoved", player, object);
        });
        Player.on("pick-up-pickup", (player, pickup) => {
            player.retval = this.callEvent("onPlayerPickUpPickup", player, pickup);
        });
        Player.on("enter-exit-mod-shop", (player, entered, interior) => {
            player.retval = this.callEvent("onEnterExitModShop", player, entered, interior);
        });
        Player.on("selected-menu-row", (player, row) => {
            player.retval = this.callEvent("onPlayerSelectedMenuRow", player, row);
        });
        Player.on("exited-menu", (player) => {
            player.retval = this.callEvent("onPlayerExitedMenu", player);
        });
        Player.on("interior-change", (player, newInterior, oldInterior) => {
            player.retval = this.callEvent("onPlayerInteriorChange", player, newInterior, oldInterior);
        });
        Player.on("key-state-change", (player, newKeys, oldKeys) => {
            player.retval = this.callEvent("onPlayerKeyStateChange", player, newKeys, oldKeys);
        });
        Player.on("update", (player) => {
            player.retval = this.callEvent("onPlayerUpdate", player);
        });
        Player.on("stream-in", (player, forPlayer) => {
            player.retval = this.callEvent("onPlayerStreamIn", player, forPlayer);
        });
        Player.on("stream-out", (player, forPlayer) => {
            player.retval = this.callEvent("onPlayerStreamOut", player, forPlayer);
        });
        Player.on("dialog-response", (player, response) => {
            player.retval = this.callEvent("onDialogResponse", player, response);
        });
        Player.on("take-damage", (player, issuer, amount, weapon, bodyPart) => {
            player.retval = this.callEvent("onPlayerTakeDamage", player, issuer, amount, weapon, bodyPart);
        });
        Player.on("give-damage", (player, damaged, amount, weapon, bodyPart) => {
            player.retval = this.callEvent("onPlayerGiveDamage", player, damaged, amount, weapon, bodyPart);
        });
        Player.on("give-damage-actor", (player, damaged, amount, weapon, bodyPart) => {
            player.retval = this.callEvent("onPlayerGiveDamageActor", player, damaged, amount, weapon, bodyPart);
        });
        Player.on("click-map", (player, pos) => {
            player.retval = this.callEvent("onPlayerClickMap", player, pos);
        });
        Player.on("click-textdraw", (player, clicked) => {
            player.retval = this.callEvent("onPlayerClickTextDraw", player, clicked);
        });
        Player.on("click-playertextdraw", (player, clicked) => {
            player.retval = this.callEvent("onPlayerClickPlayerTextDraw", player, clicked);
        });
        Player.on("incoming-connection", (player, ip, port) => {
            player.retval = this.callEvent("onIncomingConnection", player, ip, port);
        });
        Player.on("trailer-update", (player, vehicle) => {
            player.retval = this.callEvent("onTrailerUpdate", player, vehicle);
        });
        Player.on("click-player", (player, clicked, source) => {
            player.retval = this.callEvent("onPlayerClickPlayer", player, clicked, source);
        });
        Player.on("edit-object", (player, isPlayerObject, object, response, offset, rot) => {
            player.retval = this.callEvent("onPlayerEditObject", player, isPlayerObject, object, response, offset, rot);
        });
        Player.on("edit-attached-object", (player, response, index, model, bone, offset, rot, scale) => {
            player.retval = this.callEvent("onPlayerEditAttachedObject", player, response, index, model, bone, offset, rot, scale);
        });
        Player.on("select-object", (player, type, object, model, pos) => {
            player.retval = this.callEvent("onPlayerSelectObject", player, type, object, model, pos);
        });
        Player.on("weapon-shot", (player, weapon, hitType, hitId, coord) => {
            player.retval = this.callEvent("onPlayerWeaponShot", player, weapon, hitType, hitId, coord);
        });
        Rcon.on("command", (rcon, cmd) => {
            rcon.retval = this.callEvent("onRconCommand", rcon, cmd);
        });
        Rcon.on("login-attempt", (rcon, ip, password, success) => {
            rcon.retval = this.callEvent("onRconLoginAttempt", rcon, ip, password, success);
        });
        Vehicle.on("spawn", (vehicle) => {
            vehicle.retval = this.callEvent("onVehicleSpawn", vehicle);
        });
        Vehicle.on("death", (vehicle, killer) => {
            vehicle.retval = this.callEvent("onVehicleDeath", vehicle, killer);
        });
        Vehicle.on("mod", (player, vehicle, component) => {
            vehicle.retval = this.callEvent("onVehicleMod", player, vehicle, component);
        });
        Vehicle.on("paintjob", (player, vehicle, paintjob) => {
            vehicle.retval = this.callEvent("onVehiclePaintjob", player, vehicle, paintjob);
        });
        Vehicle.on("respray", (player, vehicle, colors) => {
            vehicle.retval = this.callEvent("onVehicleRespray", player, vehicle, colors);
        });
        Vehicle.on("damage-status-update", (vehicle, player) => {
            vehicle.retval = this.callEvent("onVehicleDamageStatusUpdate", vehicle, player);
        });
        Vehicle.on("unoccupied-update", (vehicle, player, passengerSeat, newPos, velocityPos) => {
            vehicle.retval = this.callEvent("onUnoccupiedVehicleUpdate", vehicle, player, passengerSeat, newPos, velocityPos);
        });
        Vehicle.on("stream-in", (vehicle, forPlayer) => {
            vehicle.retval = this.callEvent("onVehicleStreamIn", vehicle, forPlayer);
        });
        Vehicle.on("stream-out", (vehicle, forPlayer) => {
            vehicle.retval = this.callEvent("onVehicleStreamOut", vehicle, forPlayer);
        });
        Vehicle.on("siren-state-change", (player, vehicle, state) => {
            vehicle.retval = this.callEvent("onVehicleSirenStateChange", player, vehicle, state);
        });
    }
}