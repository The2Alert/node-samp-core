import {Player} from "..";
import {CommandList} from ".";

export type CommandHandler = (player: Player, ...params: any[]) => any;

export interface CommandParam {
    type: string;
    name: string;
}

export interface CommandParamType {
    regexp: string;
    parser: (value: any) => any;
}

export interface CommandEventMap {
    "command-invalid": (player: Player) => any;
    "command-not-found": (player: Player, name: string) => any;
    "command-params-mismatch": (player: Player, cmdList: CommandList) => any;
}