import {ContextMixin} from "ctx-api";
import {GameMode} from "..";
import {ContextEvents} from "./context-events";

export interface Context extends ContextEvents {
    setContextEventReturnValue(value: number): void;
}

export class Context extends ContextMixin(GameMode) {
    public handleContextEventReturnValue(returnValue: any): void {
        if(returnValue === undefined)
            return;
        switch(typeof returnValue) {
            case "number":
                return this.setContextEventReturnValue(returnValue);
            case "boolean":
                return this.setContextEventReturnValue(Number(returnValue));
        }
    }
}