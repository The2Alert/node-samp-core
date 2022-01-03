import {ContextMixin, IContext} from "ctx-api";
import {Factory} from ".";
import {Dialog, DialogResponse, Player} from "..";
import {ContextEvents} from "./context-events";

export interface ContextCommand {
    name: string;
    desc?: string;
    altNames?: string[];
    params: [string, string][];
    handler: (this: Context, ...params: any[]) => any;
}

export interface ContextKey {
    keys: number;
    handler: (this: Context) => any;
}

export interface ContextDialog {
    dialog: Dialog;
    handler: (this: Context, response: DialogResponse) => any;
}

export interface Context extends ContextEvents {}

export class Context extends ContextMixin(Player) {
    public contextCommands?: Record<string, ContextCommand>;
    public contextKeys?: Record<string, ContextKey>;
    public contextDialogs?: Record<string, ContextDialog>;

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

    public handleContextCommandWhenFrozen(command: ContextCommand): void {}

    public callContextCommand(handlerName: string, ...params: any[]): void {
        if(!this.contextCommands || !(handlerName in this.contextCommands))
            return;
        const command: ContextCommand = this.contextCommands[handlerName];
        if(this.isFrozenStrict())
            return this.handleContextCommandWhenFrozen(command);
        const {handler} = command;
        handler.apply(this, params);
    }

    public handleContextKeyWhenFrozen(key: ContextKey): void {}

    public callContextKey(handlerName: string): void {
        if(!this.contextKeys || !(handlerName in this.contextKeys))
            return;
        const key: ContextKey = this.contextKeys[handlerName];
        if(this.isFrozenStrict())
            return this.handleContextKeyWhenFrozen(key);
        const {handler} = key;
        handler.call(this);
    }

    public handleContextDialogWhenFrozen(dialog: ContextDialog): void {}

    public callContextDialog(handlerName: string, response: DialogResponse): void {
        if(!this.contextDialogs || !(handlerName in this.contextDialogs))
            return;
        const dialog: ContextDialog = this.contextDialogs[handlerName];
        if(this.isFrozenStrict())
            return this.handleContextDialogWhenFrozen(dialog);
        const {handler} = dialog;
        handler.call(this, response);
    }

    public getGamemodeContext(contextClass: IContext): InstanceType<IContext> | null {
        const factory = this.getPersonalFactory().getFactory() as Factory | null;
        return factory?.gamemode?.getPersonal().getContext(contextClass) ?? null;
    }

    public getContext(contextClass: IContext): InstanceType<IContext> | null {
        return super.getContext(contextClass) ?? this.getGamemodeContext(contextClass);
    }
}