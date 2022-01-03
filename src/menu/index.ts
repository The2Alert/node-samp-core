import * as amx from "@sa-mp/amx";
import {Position2D, Player, constants} from "..";

export interface MenuItem {
    text: string;
    column: number;
}

export interface MenuOptions extends Position2D {
    title: string;
    columns: number;
    columnWidths: [number, number?];
    headers?: [string, string?];
    items?: (string | MenuItem)[];
}

export class Menu {
    public static create(options: MenuOptions): Menu {
        const menu = new Menu(options);
        return menu.create();
    }

    public static isValid(menu: Menu): boolean {
        return Boolean(amx.callNative("IsValidMenu", "i", menu.id).retval);
    }

    public static getById(id: number): Menu {
        return new Menu(id);
    }

    public id: number = constants.INVALID_MENU;

    constructor(public readonly idOrOptions: number | MenuOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): Menu {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: MenuOptions = this.idOrOptions;
        const {title, columns, x, y, columnWidths: [col1width, col2width = 0], headers, items} = options;
        this.id = amx.callNative("CreateMenu", "siffff", title, columns, x, y, col1width, col2width).retval;
        if(headers !== undefined) {
            this.header(headers[0]);
            if(headers[1] !== undefined)
                this.header(headers[1], 1);
        }
        if(items !== undefined) {
            for(const item of items) {
                if(typeof item === "string")
                    this.add(item);
                else {
                    const {text, column} = item;
                    this.add(text, column);
                }
            }
        }
        return this;
    }

    public destroy(): boolean {
        return Boolean(amx.callNative("DestroyMenu", "i", this.id).retval);
    }

    public add(text: string, column: number = 0): number {
        return amx.callNative("AddMenuItem", "iis", this.id, column, text).retval;
    }

    public header(header: string, column: number = 0): void {
        amx.callNative("SetMenuColumnHeader", "iis", this.id, column, header);
    }

    public show(player: Player): boolean {
        return Boolean(amx.callNative("ShowMenuForPlayer", "ii", this.id, player.id).retval);
    }

    public hide(player: Player): boolean {
        return Boolean(amx.callNative("HideMenuForPlayer", "ii", this.id, player.id).retval);
    }

    public disable(): void {
        amx.callNative("DisableMenu", "i", this.id);
    }

    public disableRow(row: number): void {
        amx.callNative("DisableMenuRow", "ii", this.id, row);
    }
}