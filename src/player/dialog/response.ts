import {Player, Dialog} from "..";

export interface DialogResponse {
    id: number;
    response: boolean;
    item: number;
    inputText: string;
}

export type DialogResponseCallback = (player: Player, response: DialogResponse) => any;

export function response(dialog: Dialog, callback: DialogResponseCallback): void {
    response.autoCreate(dialog);
    response.get(dialog.id).push(callback);
}

export namespace response {
    export const list: Record<number, DialogResponseCallback[]> = {};

    export function init(): void {
        Player.on("dialog-response", (player, response) => {
            if(!is(response.id))
                return;
            for(const callback of get(response.id))
                callback(player, response);
        });
    }

    export function create(dialog: Dialog): void {
        list[dialog.id] = [];
    }

    export function is(id: number): boolean {
        return id in list;
    }

    export function autoCreate(dialog: Dialog): void {
        if(!is(dialog.id))
            create(dialog);
    }

    export function get(id: number): DialogResponseCallback[] {
        return list[id] ?? [];
    }

    export function remove(dialog: Dialog): void {
        delete list[dialog.id];
    }
}