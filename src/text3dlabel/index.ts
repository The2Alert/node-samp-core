import * as amx from "@sa-mp/amx";
import {Position, Player, Vehicle} from "..";

export * from "./player";

export interface Text3DLabelOptions extends Position {
    text: string;
    color?: number;
    drawDistance: number;
    world: number;
    testLOS?: boolean;
}

export class Text3DLabel {
    public static create(options: Text3DLabelOptions): Text3DLabel {
        const label = new Text3DLabel(options);
        return label.create();
    }

    public static getById(id: number): Text3DLabel {
        return new Text3DLabel(id);
    }

    public id: number = -1;

    constructor(public readonly idOrOptions: number | Text3DLabelOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): Text3DLabel {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: Text3DLabelOptions = this.idOrOptions;
        const {text, color = 0xFFFFFFAA, x, y, z, drawDistance, world, testLOS = false} = options;
        this.id = amx.callNative("Create3DTextLabel", "siffffii", text, color, x, y, z, drawDistance, world, Number(testLOS)).retval;
        return this;
    }

    public delete(): boolean {
        return Boolean(amx.callNative("Delete3DTextLabel", "i", this.id).retval);
    }

    public attach(attached: Player | Vehicle, offset?: Position): void {
        if(attached instanceof Player) {
            offset ??= {x: 0, y: 0, z: 0};
            amx.callNative("Attach3DTextLabelToPlayer", "iifff", this.id, attached.id, offset.x, offset.y, offset.z);
        } else if(attached instanceof Vehicle) {
            let attachedOffset: Position | undefined;
            if(typeof attached.idOrOptions === "object")
                attachedOffset = attached.idOrOptions.offset;
            offset ??= attachedOffset;
            offset ??= {x: 0, y: 0, z: 0};
            amx.callNative("Attach3DTextLabelToVehicle", "iifff", this.id, attached.id, offset.x, offset.y, offset.z);
        }
    }

    public update(text: string, color: number = 0xFFFFFFAA): void {
        amx.callNative("Update3DTextLabelText", "iis", this.id, color, text);
    }

    public is(label: Text3DLabel): boolean {
        return this.id === label.id;
    }
}