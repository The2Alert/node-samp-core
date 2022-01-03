import {Player} from "..";
import {CommandHandler, CommandParam, CommandParamType} from "./types";

export class Command {
    constructor(
        public readonly name: string, 
        public readonly params: CommandParam[],
        public readonly paramsRegexp: RegExp,
        public readonly handler: CommandHandler
    ) {}
}

export class CommandList extends Array<Command> {
    public altCommands: string[];

    constructor(public readonly name: string, public desc: string | null = null) {
        super();
        this.altCommands = [];
    }
}

export function command(name: string, paramTypesOrParams: string | [string, string][], handler: CommandHandler): Command {
    let params: CommandParam[];
    if(paramTypesOrParams instanceof Array)
        params = paramTypesOrParams.map(([type, name]) => ({type, name}));
    else params = paramTypesOrParams.split("").map((type) => ({type, name: command.paramTypeNames[type]}));
    let paramsRegexp: string = "^";
    for(const {type} of params)
        paramsRegexp += " (" + command.paramTypes[type].regexp + ")";
    paramsRegexp += "$";
    command.autoCreate(name);
    const cmd = new Command(name, params, new RegExp(paramsRegexp), handler);
    command.get(name).push(cmd);
    return cmd;
}

export namespace command {
    export const regexp = /^[/]([^ ]+)(.*)$/;

    export const paramTypes: Record<string, CommandParamType> = {
        b: {regexp: "[0-1]+", parser: (value) => Boolean(Number(value))},
        i: {regexp: "[-]?[0-9]+", parser: Number},
        f: {regexp: "[-]?[0-9]+[.,][0-9]+", parser: Number},
        n: {regexp: "[-]?[0-9]*[.,]?[0-9]+", parser: Number},
        s: {regexp: ".+", parser: String},
        w: {regexp: "[^ ]+", parser: String}
    };

    export const paramTypeNames: Record<string, string> = {
        b: "0|1",
        i: "integer",
        f: "float",
        n: "number",
        s: "string",
        w: "word"
    };

    export const list: Record<string, CommandList> = {};

    export function init(): void {
        Player.on("command-text", (player, cmdText) => {
            if(!command.regexp.test(cmdText))
                return Player.events.emit("command-invalid", player);
            const name: string = cmdText.replace(command.regexp, "$1");
            const paramsText: string = cmdText.replace(command.regexp, "$2");
            if(!is(name))
                return Player.events.emit("command-not-found", player, name);
            const cmdList: CommandList = get(name);
            let found: boolean = false;
            for(const cmd of cmdList) {
                const params: any[] | null = paramsText.match(cmd.paramsRegexp)?.splice?.(1) ?? null;
                if(params === null)
                    continue;
                cmd.params.forEach(({type}, index) => {
                    params[index] = command.paramTypes[type].parser(params[index]);
                });
                cmd.handler(player, ...params);
                found = true;
                break;
            }
            if(found)
                player.retval = 1;
            else return Player.events.emit("command-params-mismatch", player, cmdList);
        });
    }
    
    export function is(name: string): boolean {
        return name in list;
    }

    export function create(name: string): CommandList {
        return list[name] = new CommandList(name);
    }

    export function autoCreate(name: string): void {
        if(!command.is(name))
            command.create(name);
    }

    export function get(name: string): CommandList {
        return list[name] ?? new CommandList("none");
    }

    export function desc(name: string, desc: string): CommandList {
        autoCreate(name);
        const cmdList: CommandList = get(name);
        cmdList.desc = desc;
        return cmdList;
    }

    export function alt(name: string, ...altNames: string[]): boolean {
        autoCreate(name);
        let result: boolean = true;
        const cmdList: CommandList = get(name);
        for(const altName of altNames) {
            if(is(altName)) {
                result = false;
                continue;
            }
            list[altName] = cmdList;
            cmdList.altCommands.push(altName);
        }
        return result;
    }

    export function remove(...names: string[]): void {
        for(const name of names)
            delete list[name];
    }
}