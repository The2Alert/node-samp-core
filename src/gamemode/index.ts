import {EventEmitter, DefaultEventMap} from "tsee";
import * as amx from "@sa-mp/amx";
import {GameModeFunctions} from "./functions";

export * from "./functions";

export interface GameModeEventMap extends DefaultEventMap {
    init: (gamemode: GameMode) => any;
    exit: (gamemode: GameMode) => any;
}

export class GameMode extends GameModeFunctions {
    public static readonly events: EventEmitter<GameModeEventMap> = new EventEmitter;
    public static readonly on = GameMode.events.on;
    
    public static init(): void {
        amx.onPublicCall("OnGameModeInit", "", GameMode.emit.bind(this, "init"));
        amx.onPublicCall("OnGameModeExit", "", GameMode.emit.bind(this, "exit"));
    }

    public static emit<EventKey extends keyof GameModeEventMap>(key: EventKey): number | void {
        const gamemode = new GameMode;
        GameMode.events.emit<any>(key, gamemode);
        const {retval} = gamemode;
        if(typeof retval === "number")
            return retval;
    }

    public retval?: number;
}

import {
    Factory as GameModeFactory, 
    PersonalFactory as GameModePersonalFactory, 
    Context as GameModeContext, 
    ContextEvents as GameModeContextEvents,
    Service as GameModeService,
    Extension as GameModeExtension
} from "./context";

export namespace GameMode {
    export const Factory = GameModeFactory;
    export type PersonalFactory = GameModePersonalFactory;
    export const Context = GameModeContext;
    export type ContextEvents = GameModeContextEvents;
    export const Service = GameModeService;
    export const Extension = GameModeExtension;
}

GameMode.init();