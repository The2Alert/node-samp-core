import {EventEmitter, DefaultEventMap} from "tsee";
import * as amx from "@sa-mp/amx";
import {Position} from "..";
import {ObjectFunctions} from "./functions";

export * from "./enums";
export * from "./functions";
export * from "./player";

export interface ObjectEventMap extends DefaultEventMap {
    moved: (object: SampObject) => any;
}

export interface ObjectOptions extends Position {
    model: number;
    rot: Position;
    drawDistance?: number;
}

export class SampObject extends ObjectFunctions {
    public static readonly events: EventEmitter<ObjectEventMap> = new EventEmitter;
    public static readonly on = SampObject.events.on;

    public static init(): void {
        amx.onPublicCall("OnObjectMoved", "i", (objectid) => SampObject.emitById("moved", objectid as number));
    }

    public static emit<EventKey extends keyof ObjectEventMap>(key: EventKey, object: SampObject, ...args: Parameters<ObjectEventMap[EventKey]>): number | void {
        SampObject.events.emit(key, ...args);
        const {retval} = object;
        if(typeof retval === "number")
            return retval;
    }

    public static emitById<EventKey extends keyof ObjectEventMap>(key: EventKey, id: number): number | void {
        const object = new SampObject(id);
        return SampObject.emit<any>(key, object, object);
    }

    public static getById(id: number): SampObject {
        return new SampObject(id);
    }

    public retval?: number;

    constructor(idOrOptions: number | ObjectOptions) {
        super(idOrOptions);
    }
}

SampObject.init();