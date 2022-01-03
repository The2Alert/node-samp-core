import * as ctx from "ctx-api";
import {ContextEvents} from "./context-events";

export interface PersonalFactory extends ctx.PersonalFactory {
    callEvent<EventName extends keyof ContextEvents>(name: EventName, ...args: Parameters<ContextEvents[EventName]>): number | undefined;
}