import * as amx from "@sa-mp/amx";
import {constants, Player, Position2D, Size, TextDrawFonts, TextDrawSetPreviewRotOptions} from "..";

export interface PlayerTextDrawOptions extends Position2D {
    text: string;
    letterSize?: Size;
    textSize?: Size;
    align?: number;
    color?: number;
    box?: boolean;
    boxColor?: number;
    shadow?: number;
    outline?: number;
    backgroundColor?: number;
    font?: TextDrawFonts;
    proportional?: boolean;
    selectable?: boolean;
    previewModel?: number;
    previewRot?: TextDrawSetPreviewRotOptions;
    previewVehCol?: [number, number];
}

export class PlayerTextDraw {
    public static create(options: PlayerTextDrawOptions, player: Player): PlayerTextDraw {
        const textdraw = new PlayerTextDraw(options, player);
        return textdraw.create();
    }

    public static getById(id: number, player: Player): PlayerTextDraw {
        return new PlayerTextDraw(id, player);
    }

    public id: number = constants.INVALID_TEXT_DRAW;

    constructor(public readonly idOrOptions: PlayerTextDrawOptions | number, public readonly player: Player) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): PlayerTextDraw {
        if(typeof this.idOrOptions === "number")
            return this;
        const {x, y, text, letterSize, textSize, align, color, box, boxColor, shadow, outline, backgroundColor, font, proportional, selectable, previewModel, previewRot, previewVehCol} = this.idOrOptions;
        this.id = amx.callNative("CreatePlayerTextDraw", "iffs", this.player.id, x, y, text).retval;
        if(letterSize !== undefined)
            this.letterSize = letterSize;
        if(textSize !== undefined)
            this.textSize = textSize; 
        if(align !== undefined)
            this.align = align;
        if(color !== undefined)
            this.color = color; 
        if(box !== undefined)
            this.box = box;
        if(boxColor !== undefined)
            this.boxColor = boxColor;
        if(shadow !== undefined)
            this.shadow = shadow; 
        if(outline !== undefined)
            this.outline = outline;
        if(backgroundColor !== undefined)
            this.backgroundColor = backgroundColor; 
        if(font !== undefined)
            this.font = font; 
        if(proportional !== undefined)
            this.proportional = proportional; 
        if(selectable !== undefined)
            this.selectable = selectable; 
        if(previewModel !== undefined)
            this.previewModel = previewModel; 
        if(previewRot !== undefined)
            this.previewRot = previewRot;
        if(previewVehCol !== undefined)
            this.previewVehCol = previewVehCol;
        return this;
    }

    public destroy(): void {
        amx.callNative("PlayerTextDrawDestroy", "ii", this.player.id, this.id);
    }

    public set letterSize({width, height}: Size) {
        amx.callNative("PlayerTextDrawLetterSize", "iiff", this.player.id, this.id, width, height);
    }

    public set textSize({width, height}: Size) {
        amx.callNative("PlayerTextDrawTextSize", "iiff", this.player.id, this.id, width, height);
    }

    public set align(alignment: number) {
        amx.callNative("PlayerTextDrawAlignment", "iii", this.player.id, this.id, alignment);
    }

    public set color(color: number) {
        amx.callNative("PlayerTextDrawColor", "iii", this.player.id, this.id, color);
    }

    public set box(use: boolean) {
        amx.callNative("PlayerTextDrawUseBox", "iii", this.player.id, this.id, Number(use));
    }

    public set boxColor(color: number) {
        amx.callNative("PlayerTextDrawBoxColor", "iii", this.player.id, this.id, color);
    }

    public set shadow(size: number) {
        amx.callNative("PlayerTextDrawSetShadow", "iii", this.player.id, this.id, size);
    }

    public set outline(size: number) {
        amx.callNative("PlayerTextDrawSetOutline", "iii", this.player.id, this.id, size);
    }

    public set backgroundColor(color: number) {
        amx.callNative("PlayerTextDrawBackgroundColor", "iii", this.player.id, this.id, color);
    }

    public set font(font: TextDrawFonts) {
        amx.callNative("PlayerTextDrawFont", "iii", this.player.id, this.id, font);
    }

    public set proportional(proportional: boolean) {
        amx.callNative("PlayerTextDrawSetProportional", "iii", this.player.id, this.id, Number(proportional));
    }

    public set selectable(selectable: boolean) {
        amx.callNative("PlayerTextDrawSetSelectable", "iii", this.player.id, this.id, Number(selectable));
    }

    public show(): void {
        amx.callNative("PlayerTextDrawShow", "ii", this.player.id, this.id);
    }

    public hide(): void {
        amx.callNative("PlayerTextDrawHide", "ii", this.player.id, this.id);
    }

    public set text(text: string) {
        amx.callNative("PlayerTextDrawSetString", "iis", this.player.id, this.id, text);
    }

    public set previewModel(model: number) {
        amx.callNative("PlayerTextDrawSetPreviewModel", "iii", this.player.id, this.id, model);
    }

    public set previewRot({rot, zoom = 1}: TextDrawSetPreviewRotOptions) {
        amx.callNative("PlayerTextDrawSetPreviewRot", "iiffff", this.player.id, this.id, rot.x, rot.y, rot.z, zoom);
    }

    public set previewVehCol([color1, color2]: [number, number]) {
        amx.callNative("PlayerTextDrawSetPreviewVehCol", "iiii", this.player.id, this.id, color1, color2);
    }
}