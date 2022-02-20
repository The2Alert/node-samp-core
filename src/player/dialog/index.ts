import {ShowDialogOptions} from "..";
import {response} from "./response";

export {DialogResponse, DialogResponseCallback} from "./response";

export enum DialogStyles {
    MSGBOX = 0,
    INPUT = 1,
    LIST = 2,
    PASSWORD = 3,
    TABLIST = 4,
    TABLIST_HEADERS = 5
}

export interface DialogOptions {
    style: DialogStyles;
    caption: string;
    info: string; 
    buttons: [string, string?];
}

export class Dialog implements ShowDialogOptions {
    public static readonly response = response;

    public static poolSize: number = 0;

    public id: number;
    public style: DialogStyles;
    public caption: string;
    public info: string;
    public buttons: [string, string?];

    constructor({style, caption, info, buttons}: DialogOptions) {
        this.id = ++Dialog.poolSize;
        this.style = style;
        this.caption = caption;
        this.info = info;
        this.buttons = buttons;
    }

    public is(dialog: Dialog): boolean {
        return this.id === dialog.id;
    }
}