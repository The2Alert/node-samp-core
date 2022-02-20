import * as amx from "@sa-mp/amx";
import {Position2D, Position, Size, TextDrawFonts, Player, constants} from "..";

export * from "./enums";
export * from "./player";

export interface TextDrawOptions extends Position2D {
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

export interface TextDrawSetPreviewRotOptions {
    rot: Position;
    zoom?: number;
}

export class TextDraw {
    public static create(options: TextDrawOptions): TextDraw {
        const textdraw = new TextDraw(options);
        return textdraw.create();
    }

    public static getById(id: number): TextDraw {
        return new TextDraw(id);
    }

    public id: number = constants.INVALID_TEXT_DRAW;

    constructor(public readonly idOrOptions: number | TextDrawOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): TextDraw {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: TextDrawOptions = this.idOrOptions;
        const {x, y, text, letterSize, textSize, align, color, box, boxColor, shadow, outline, backgroundColor, font, proportional, selectable, previewModel, previewRot, previewVehCol} = options;
        this.id = amx.callNative("TextDrawCreate", "ffs", x, y, text).retval;
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
        amx.callNative("TextDrawDestroy", "i", this.id);
    }

    public set letterSize({width, height}: Size) {
        amx.callNative("TextDrawLetterSize", "iff", this.id, width, height);
    }

    public set textSize({width, height}: Size) {
        amx.callNative("TextDrawTextSize", "iff", this.id, width, height);
    }

    public set align(alignment: number) {
        amx.callNative("TextDrawAlignment", "ii", this.id, alignment);
    }

    public set color(color: number) {
        amx.callNative("TextDrawColor", "ii", this.id, color);
    }    

    public set box(use: boolean) {
        amx.callNative("TextDrawUseBox", "ii", this.id, Number(use));
    }

    public set boxColor(color: number) {
        amx.callNative("TextDrawBoxColor", "ii", this.id, color);
    }

    public set shadow(size: number) {
        amx.callNative("TextDrawSetShadow", "ii", this.id, size);
    }

    public set outline(size: number) {
        amx.callNative("TextDrawSetOutline", "ii", this.id, size);
    }

    public set backgroundColor(color: number) {
        amx.callNative("TextDrawBackgroundColor", "ii", this.id, color);
    }

    public set font(font: TextDrawFonts) {
        amx.callNative("TextDrawFont", "ii", this.id, font);
    }

    public set proportional(proportional: boolean) {
        amx.callNative("TextDrawSetProportional", "ii", this.id, Number(proportional));
    }

    public set selectable(selectable: boolean) {
        amx.callNative("TextDrawSetSelectable", "ii", this.id, Number(selectable));
    }

    public show(player: Player): boolean {
        return Boolean(amx.callNative("TextDrawShowForPlayer", "ii", player.id, this.id).retval);
    }

    public hide(player: Player): void {
        amx.callNative("TextDrawHideForPlayer", "ii", player.id, this.id);
    }

    public showForAll(): boolean {
        return Boolean(amx.callNative("TextDrawShowForAll", "i", this.id).retval);
    }

    public hideForAll(): void {
        amx.callNative("TextDrawHideForAll", "i", this.id);
    }

    public set text(text: string) {
        amx.callNative("TextDrawSetString", "is", this.id, text);
    }

    public set previewModel(model: number) {
        amx.callNative("TextDrawSetPreviewModel", "ii", this.id, model);
    }

    public set previewRot({rot, zoom = 1}: TextDrawSetPreviewRotOptions) {
        const {x: fRotX, y: fRotY, z: fRotZ} = rot;
        amx.callNative("TextDrawSetPreviewRot", "iffff", this.id, fRotX, fRotY, fRotZ, zoom);
    }

    public set previewVehCol([color1, color2]: [number, number]) {
        amx.callNative("TextDrawSetPreviewVehCol", "iii", this.id, color1, color2);
    }

    public is(textdraw: TextDraw): boolean {
        return this.id === textdraw.id;
    }
}