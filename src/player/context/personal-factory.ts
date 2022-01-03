import * as ctx from "ctx-api";
import {ContextEvents} from ".";

export interface PersonalFactory extends ctx.PersonalFactory {
    callEvent<EventName extends keyof ContextEvents>(name: EventName, ...args: Parameters<ContextEvents[EventName]>): number | undefined;
}