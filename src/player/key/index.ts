import {Player} from "..";

export class Key {
    constructor(public readonly keys: number, public readonly handler: KeyHandler) {}
}

export type KeyHandler = (player: Player, keys: number, oldKeys: number) => any;

export function key(keys: number, handler: KeyHandler): Key[] {
    key.autoCreate(keys);
    const keyList: Key[] = key.get(keys);
    keyList.push(new Key(keys, handler));
    return keyList;
}

export namespace key {
    export const list: Record<number, Key[]> = {};

    export function init(): void {
        Player.on("key-state-change", (player, keys, oldKeys) => {
            if(!is(keys))
                return;
            for(const key of get(keys))
                key.handler(player, keys, oldKeys);
        });
    }

    export function create(keys: number): Key[] {
        return list[keys] = [];
    }

    export function is(keys: number): boolean {
        return keys in list;
    }

    export function get(keys: number): Key[] {
        return list[keys] ?? [];
    }

    export function autoCreate(keys: number): void {
        if(!is(keys))
            create(keys);
    }

    export function remove(keys: number): void {
        delete list[keys];
    }
}