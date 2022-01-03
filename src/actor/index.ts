import {EventEmitter, DefaultEventMap} from "tsee";
import * as amx from "@sa-mp/amx";
import {Player, Position} from "..";
import {ActorFunctions} from "./functions";

export * from "./functions";

export interface ActorEventMap extends DefaultEventMap {
    "stream-in": (actor: Actor, forPlayer: Player) => any;
    "stream-out": (actor: Actor, forPlayer: Player) => any;
}

export interface ActorOptions extends Position {
    model: number;
    rotation: number;
    world?: number;
    health?: number;
    invulnerable?: boolean;
}

export class Actor extends ActorFunctions {
    public static readonly events: EventEmitter<ActorEventMap> = new EventEmitter;
    public static readonly on = Actor.events.on;

    public static init(): void {
        amx.onPublicCall("OnActorStreamIn", "ii", (actorid, forplayerid) => {
            const actor = new Actor(actorid as number);
            const forPlayer = new Player(forplayerid as number);
            return Actor.emit("stream-in", actor, actor, forPlayer);
        });
        amx.onPublicCall("OnActorStreamOut", "ii", (actorid, forplayerid) => {
            const actor = new Actor(actorid as number);
            const forPlayer = new Player(forplayerid as number);
            return Actor.emit("stream-out", actor, actor, forPlayer);
        });
    }

    public static emit<EventKey extends keyof ActorEventMap>(key: EventKey, actor: Actor, ...args: Parameters<ActorEventMap[EventKey]>): number | void {
        Actor.events.emit(key, ...args);
        const {retval} = actor;
        if(typeof retval === "number")
            return retval;
    }

    public static getById(id: number): Actor {
        return new Actor(id);
    }

    public retval?: number;

    constructor(idOrOptions: number | ActorOptions) {
        super(idOrOptions);
    }
}

Actor.init();