import * as ctx from "ctx-api";
import {Context, ContextCommand, ContextDialog, ContextKey, PersonalFactory} from ".";
import {Player, Actor, Vehicle, Dialog, GameMode} from "../..";

export interface FactoryOptions {
    gamemodeFactory?: InstanceType<typeof GameMode.Factory> | null;
    commands?: boolean;
    keys?: boolean;
    dialogs?: boolean;
}

export class Factory extends ctx.Factory {
    public static create(rootContextClass: typeof Context, options?: FactoryOptions): Factory {
        const factory = new Factory(rootContextClass, options ?? {});
        factory.create();
        return factory;
    }

    public options: Required<FactoryOptions>;
    public gamemode: InstanceType<typeof GameMode.Factory> | null;

    constructor(rootContextClass: typeof Context, {gamemodeFactory = null, commands = false, keys = false, dialogs = false}: FactoryOptions) {
        super(rootContextClass);
        this.options = {gamemodeFactory, commands, keys, dialogs};
        this.gamemode = gamemodeFactory;
    }

    public createPersonal(player: Player): PersonalFactory {
        return this.createPersonalById(player.id, [player.id]);
    }

    public getPersonal(player: Player): PersonalFactory {
        return this.getPersonalById(player.id);
    }

    public removePersonal(player: Player): void {
        return this.removePersonalById(player.id);
    }

    private createCommands(contextClass: typeof Context): void {
        const {contextCommands} = contextClass.prototype;
        if(contextCommands) {
            for(const handlerName in contextCommands) {
                const command: ContextCommand = contextCommands[handlerName];
                Player.command(command.name, command.params, (player, ...params) => {
                    const context = this.getPersonal(player).getContext(contextClass) as Context | null;
                    context?.callContextCommand(handlerName, ...params);
                });
                if(command.desc !== undefined)
                    Player.command.desc(command.name, command.desc);
                if(command.altNames !== undefined)
                    Player.command.alt(command.name, ...command.altNames);
            }
        }
        for(const childClass of contextClass.contextChildren)
            this.createCommands(childClass as typeof Context);
    }

    private createKeys(contextClass: typeof Context): void {
        const {contextKeys} = contextClass.prototype;
        if(contextKeys) {
            for(const handlerName in contextKeys) {
                const key: ContextKey = contextKeys[handlerName];
                Player.key(key.keys, (player) => {
                    const context = this.getPersonal(player).getContext(contextClass) as Context | null;
                    context?.callContextKey(handlerName);
                });
            }
        }
        for(const childClass of contextClass.contextChildren)
            this.createKeys(childClass as typeof Context);
    }

    private createDialogs(contextClass: typeof Context): void {
        const {contextDialogs} = contextClass.prototype;
        if(contextDialogs) {
            for(const handlerName in contextDialogs) {
                const dialog: ContextDialog = contextDialogs[handlerName];
                Dialog.response(dialog.dialog, (player, response) => {
                    const context = this.getPersonal(player).getContext(contextClass) as Context | null;
                    context?.callContextDialog(handlerName, response);
                });
            }
        }
        for(const childClass of contextClass.contextChildren)
            this.createDialogs(childClass as typeof Context);
    }

    public create(): void {
        super.create();
        Player.on("connect", (player) => {
            this.createPersonal(player);
            player.retval = this.getPersonal(player).callEvent("onConnect");
        });
        Player.on("disconnect", (player, reason) => {
            player.retval = this.getPersonal(player).callEvent("onDisconnect", reason);
            this.removePersonal(player);
        });
        Actor.on("stream-in", (actor, forPlayer) => {
            actor.retval = this.getPersonal(forPlayer).callEvent("onActorStreamIn", actor);
        });
        Actor.on("stream-out", (actor, forPlayer) => {
            actor.retval = this.getPersonal(forPlayer).callEvent("onActorStreamOut", actor);
        });
        Player.on("spawn", (player) => {
            player.retval = this.getPersonal(player).callEvent("onSpawn");
        });
        Player.on("death", (player, killer, reason) => {
            player.retval = this.getPersonal(player).callEvent("onDeath", killer, reason);
        });
        Player.on("text", (player, text) => {
            player.retval = this.getPersonal(player).callEvent("onText", text);
        });
        Player.on("command-text", (player, cmdText) => {
            player.retval = this.getPersonal(player).callEvent("onCommandText", cmdText);
        });
        Player.on("request-class", (player, classId) => {
            player.retval = this.getPersonal(player).callEvent("onRequestClass", classId);
        });
        Player.on("enter-vehicle", (player, vehicle, isPassenger) => {
            player.retval = this.getPersonal(player).callEvent("onEnterVehicle", vehicle, isPassenger);
        });
        Player.on("exit-vehicle", (player, vehicle) => {
            player.retval = this.getPersonal(player).callEvent("onExitVehicle", vehicle);
        });
        Player.on("state-change", (player, newState, oldState) => {
            player.retval = this.getPersonal(player).callEvent("onStateChange", newState, oldState);
        });
        Player.on("enter-checkpoint", (player) => {
            player.retval = this.getPersonal(player).callEvent("onEnterCheckpoint");
        });
        Player.on("leave-checkpoint", (player) => {
            player.retval = this.getPersonal(player).callEvent("onLeaveCheckpoint");
        });
        Player.on("enter-race-checkpoint", (player) => {
            player.retval = this.getPersonal(player).callEvent("onEnterRaceCheckpoint");
        });
        Player.on("leave-race-checkpoint", (player) => {
            player.retval = this.getPersonal(player).callEvent("onLeaveRaceCheckpoint");
        });
        Player.on("request-spawn", (player) => {
            player.retval = this.getPersonal(player).callEvent("onRequestSpawn");
        });
        Player.on("object-moved", (player, object) => {
            player.retval = this.getPersonal(player).callEvent("onObjectMoved", object);
        });
        Player.on("pick-up-pickup", (player, pickup) => {
            player.retval = this.getPersonal(player).callEvent("onPickUpPickup", pickup);
        });
        Player.on("enter-exit-mod-shop", (player, entered, interior) => {
            player.retval = this.getPersonal(player).callEvent("onEnterExitModShop", entered, interior);
        });
        Player.on("selected-menu-row", (player, row) => {
            player.retval = this.getPersonal(player).callEvent("onSelectedMenuRow", row);
        });
        Player.on("exited-menu", (player) => {
            player.retval = this.getPersonal(player).callEvent("onExitedMenu");
        });
        Player.on("interior-change", (player, newInterior, oldInterior) => {
            player.retval = this.getPersonal(player).callEvent("onInteriorChange", newInterior, oldInterior);
        });
        Player.on("key-state-change", (player, newKeys, oldKeys) => {
            player.retval = this.getPersonal(player).callEvent("onKeyStateChange", newKeys, oldKeys);
        });
        Player.on("update", (player) => {
            player.retval = this.getPersonal(player).callEvent("onUpdate");
        });
        Player.on("stream-in", (player, forPlayer) => {
            player.retval = this.getPersonal(player).callEvent("onStreamIn", forPlayer);
        });
        Player.on("stream-out", (player, forPlayer) => {
            player.retval = this.getPersonal(player).callEvent("onStreamOut", forPlayer);
        });
        Player.on("dialog-response", (player, response) => {
            player.retval = this.getPersonal(player).callEvent("onDialogResponse", response);
        });
        Player.on("take-damage", (player, issuer, amount, weapon, bodyPart) => {
            player.retval = this.getPersonal(player).callEvent("onTakeDamage", issuer, amount, weapon, bodyPart);
        });
        Player.on("give-damage", (player, damaged, amount, weapon, bodyPart) => {
            player.retval = this.getPersonal(player).callEvent("onGiveDamage", damaged, amount, weapon, bodyPart);
        });
        Player.on("give-damage-actor", (player, damaged, amount, weapon, bodyPart) => {
            player.retval = this.getPersonal(player).callEvent("onGiveDamageActor", damaged, amount, weapon, bodyPart);
        });
        Player.on("click-map", (player, pos) => {
            player.retval = this.getPersonal(player).callEvent("onClickMap", pos);
        });
        Player.on("click-textdraw", (player, clicked) => {
            player.retval = this.getPersonal(player).callEvent("onClickTextDraw", clicked);
        });
        Player.on("click-playertextdraw", (player, clicked) => {
            player.retval = this.getPersonal(player).callEvent("onClickPlayerTextDraw", clicked);
        });
        Player.on("incoming-connection", (player, ip, port) => {
            player.retval = this.getPersonal(player).callEvent("onIncomingConnection", ip, port);
        });
        Player.on("trailer-update", (player, vehicle) => {
            player.retval = this.getPersonal(player).callEvent("onTrailerUpdate", vehicle);
        });
        Player.on("click-player", (player, clicked, source) => {
            player.retval = this.getPersonal(player).callEvent("onClickPlayer", clicked, source);
        });
        Player.on("edit-object", (player, isPlayerObject, object, response, offset, rot) => {
            player.retval = this.getPersonal(player).callEvent("onEditObject", isPlayerObject, object, response, offset, rot);
        });
        Player.on("edit-attached-object", (player, response, index, model, bone, offset, rot, scale) => {
            player.retval = this.getPersonal(player).callEvent("onEditAttachedObject", response, index, model, bone, offset, rot, scale);
        });
        Player.on("select-object", (player, type, object, model, pos) => {
            player.retval = this.getPersonal(player).callEvent("onSelectObject", type, object, model, pos);
        });
        Player.on("weapon-shot", (player, weapon, hitType, hitId, coord) => {
            player.retval = this.getPersonal(player).callEvent("onWeaponShot", weapon, hitType, hitId, coord);
        });
        Vehicle.on("death", (vehicle, killer) => {
            vehicle.retval = this.getPersonal(killer).callEvent("onVehicleDeath", vehicle);
        });
        Vehicle.on("mod", (player, vehicle, component) => {
            vehicle.retval = this.getPersonal(player).callEvent("onVehicleMod", vehicle, component);
        });
        Vehicle.on("paintjob", (player, vehicle, paintjob) => {
            vehicle.retval = this.getPersonal(player).callEvent("onVehiclePaintjob", vehicle, paintjob);
        });
        Vehicle.on("respray", (player, vehicle, colors) => {
            vehicle.retval = this.getPersonal(player).callEvent("onVehicleRespray", vehicle, colors);
        });
        Vehicle.on("damage-status-update", (vehicle, player) => {
            vehicle.retval = this.getPersonal(player).callEvent("onVehicleDamageStatusUpdate", vehicle);
        });
        Vehicle.on("unoccupied-update", (vehicle, player, passengerSeat, newPos, velocityPos) => {
            vehicle.retval = this.getPersonal(player).callEvent("onUnoccupiedVehicleUpdate", vehicle, passengerSeat, newPos, velocityPos);
        });
        Vehicle.on("stream-in", (vehicle, forPlayer) => {
            vehicle.retval = this.getPersonal(forPlayer).callEvent("onVehicleStreamIn", vehicle);
        });
        Vehicle.on("stream-out", (vehicle, forPlayer) => {
            vehicle.retval = this.getPersonal(forPlayer).callEvent("onVehicleStreamOut", vehicle);
        });
        Vehicle.on("siren-state-change", (player, vehicle, state) => {
            vehicle.retval = this.getPersonal(player).callEvent("onVehicleSirenStateChange", vehicle, state);
        });
        if(this.options.commands) {
            Player.command.init();
            this.createCommands(this.rootContextClass as typeof Context);
            Player.on("command-invalid", (player) => {
                player.retval = this.getPersonal(player).callEvent("onCommandInvalid");
            });
            Player.on("command-not-found", (player, name) => {
                player.retval = this.getPersonal(player).callEvent("onCommandNotFound", name);
            });
            Player.on("command-params-mismatch", (player, cmdList) => {
                player.retval = this.getPersonal(player).callEvent("onCommandParamsMismatch", cmdList);
            });
        }
        if(this.options.keys) {
            Player.key.init();
            this.createKeys(this.rootContextClass as typeof Context);
        }
        if(this.options.dialogs) {
            Dialog.response.init();
            this.createDialogs(this.rootContextClass as typeof Context);
        }
    }
}