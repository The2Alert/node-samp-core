import * as amx from "@sa-mp/amx";
import {constants, Actor, ActorOptions, Player, Position} from "..";

export interface ActorAnimationOptions {
    library: string;
    name: string;
    speed?: number;
    loop: boolean;
    lockX: boolean;
    lockY: boolean;
    freeze: boolean;
    time: number;
}

export class ActorFunctions {
    public static get poolSize(): number {
        return amx.callNative("GetActorPoolSize", "").retval;
    }

    public static create(options: ActorOptions): Actor {
        const actor = new Actor(options);
        return actor.create();
    }

    public static isValid(actor: Actor): boolean {
        return Boolean(amx.callNative("IsValidActor", "i", actor.id).retval);
    }

    public id: number = constants.INVALID_ACTOR_ID;

    constructor(public readonly idOrOptions: number | ActorOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): Actor {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: ActorOptions = this.idOrOptions;
        const {model, x, y, z, rotation, world, health, invulnerable} = options;
        this.id = amx.callNative("CreateActor", "iffff", model, x, y, z, rotation).retval;
        if(world !== undefined)
            this.world = world;
        if(health !== undefined)
            this.health = health;
        if(invulnerable !== undefined)
            this.invulnerable = invulnerable;
        return this;
    }

    public destroy(): boolean {
        return Boolean(amx.callNative("DestroyActor", "i", this.id).retval);
    }

    public isStreamedIn(forPlayer: Player): boolean {
        return Boolean(amx.callNative("IsActorStreamedIn", "ii", this.id, forPlayer.id).retval);
    }

    public set world(world: number) {
        amx.callNative("SetActorVirtualWorld", "ii", this.id, world);
    }

    public get world(): number {
        return amx.callNative("GetActorVirtualWorld", "i", this.id).retval;
    }

    public anim({library, name, speed = 4.1, loop, lockX, lockY, freeze, time}: ActorAnimationOptions): boolean {
        return Boolean(amx.callNative("ApplyActorAnimation", "issfiiiii", this.id, library, name, speed, Number(loop), Number(lockX), Number(lockY), Number(freeze), time).retval);
    }

    public clearAnims(): boolean {
        return Boolean(amx.callNative("ClearActorAnimations", "i", this.id).retval);
    }

    public set pos({x, y, z}: Position) {
        amx.callNative("SetActorPos", "ifff", this.id, x, y, z);
    }

    public get pos(): Position {
        const [x, y, z] = amx.callNative("GetActorPos", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public set angle(angle: number) {
        amx.callNative("SetActorFacingAngle", "if", this.id, angle);
    }

    public get angle(): number {
        return amx.callNative("GetActorFacingAngle", "iF", this.id)[0] as number;
    }

    public set health(health: number) {
        amx.callNative("SetActorHealth", "if", this.id, health);
    }

    public get health(): number {
        return amx.callNative("GetActorHealth", "iF", this.id)[0] as number;
    }

    public set invulnerable(invulnerable: boolean) {
        amx.callNative("SetActorInvulnerable", "ii", this.id, Number(invulnerable));
    }

    public get invulnerable(): boolean {
        return Boolean(amx.callNative("IsActorInvulnerable", "i", this.id).retval);
    }

    public is(actor: Actor): boolean {
        return this.id === actor.id;
    }
}