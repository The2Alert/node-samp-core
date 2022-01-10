import * as amx from "@sa-mp/amx";
import {ObjectOptions, Player, Position, SampObject, Vehicle, ObjectMaterialSize, ObjectMaterialTextAlignments, constants} from "..";

export interface ObjectAttachOptions {
    offset: Position;
    rot: Position;
    syncRotation?: boolean;
}

export interface MoveObjectOptions extends Position {
    speed: number;
    rot?: Position;
}

export interface ObjectMaterialOptions {
    index: number;
    model: number;
    txdName: string;
    textureName: string;
    color?: number;
}

export interface ObjectMaterialTextOptions {
    text: string;
    index?: number;
    size?: ObjectMaterialSize;
    fontFace?: string;
    fontSize?: number;
    bold?: boolean;
    color?: number;
    backgroundColor?: number;
    align?: ObjectMaterialTextAlignments;
}

export class ObjectFunctions {
    public static create(options: ObjectOptions): SampObject {
        const object = new SampObject(options);
        return object.create();
    }

    public static isValid(object: SampObject): boolean {
        return Boolean(amx.callNative("IsValidObject", "i", object.id).retval);
    }

    public static set cameraCol(disable: boolean) {
        amx.callNative("SetObjectsDefaultCameraCol", "i", Number(disable));
    }

    public id: number = constants.INVALID_OBJECT_ID;

    constructor(public readonly idOrOptions: number | ObjectOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): SampObject {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: ObjectOptions = this.idOrOptions;
        const {model, x, y, z, rot, drawDistance = 0} = options;
        this.id = amx.callNative("CreateObject", "ifffffff", model, x, y, z, rot.x, rot.y, rot.z, drawDistance).retval;
        return this;
    }

    public attach(attached: Vehicle | SampObject | Player, options?: ObjectAttachOptions): void {
        if(attached instanceof Vehicle) {
            let attachedOptions: ObjectAttachOptions | undefined;
            if(typeof attached.idOrOptions === "object")
                attachedOptions = attached.idOrOptions.attach;
            const {offset, rot}: ObjectAttachOptions = options ?? attachedOptions ?? {offset: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}};
            amx.callNative("AttachObjectToVehicle", "iiffffff", this.id, attached.id, offset.x, offset.y, offset.z, rot.x, rot.y, rot.z);
        } else if(attached instanceof SampObject) {
            let attachedOptions: ObjectAttachOptions | undefined;
            if(typeof attached.idOrOptions === "object")
                attachedOptions = attached.idOrOptions.attach;
            const {offset, rot, syncRotation}: ObjectAttachOptions = options ?? attachedOptions ?? {offset: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}};
            amx.callNative("AttachObjectToObject", "iiffffffi", this.id, attached.id, offset.x, offset.y, offset.z, rot.x, rot.y, rot.z, Number(syncRotation ?? true));
        } else if(attached instanceof Player) {
            const {offset, rot}: ObjectAttachOptions = options ?? {offset: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}};
            amx.callNative("AttachObjectToPlayer", "iiffffff", this.id, attached.id, offset.x, offset.y, offset.z, rot.x, rot.y, rot.z);
        }
    }

    public set pos({x, y, z}: Position) {
        amx.callNative("SetObjectPos", "ifff", this.id, x, y, z);
    }

    public get pos(): Position {
        const [x, y, z] = amx.callNative("GetObjectPos", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public set rot({x, y, z}: Position) {
        amx.callNative("SetObjectRot", "ifff", this.id, x, y, z);
    }

    public get rot(): Position {
        const [x, y, z] = amx.callNative("GetObjectRot", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public get model(): number {
        return amx.callNative("GetObjectModel", "i", this.id).retval;
    }

    public noCameraCol(): boolean {
        return Boolean(amx.callNative("SetObjectNoCameraCol", "i", this.id).retval);
    }

    public destroy(): void {
        amx.callNative("DestroyObject", "i", this.id);
    }

    public move({x, y, z, speed, rot = {x: -1000, y: -1000, z: -1000}}: MoveObjectOptions): number {
        return amx.callNative("MoveObject", "ifffffff", this.id, x, y, z, speed, rot.x, rot.y, rot.z).retval;
    }

    public stop(): void {
        amx.callNative("StopObject", "i", this.id);
    }

    public moving(): boolean {
        return Boolean(amx.callNative("IsObjectMoving", "i", this.id).retval);
    }

    public edit(player: Player): boolean {
        return Boolean(amx.callNative("EditObject", "ii", player.id, this.id).retval);
    }

    public material({index, model, txdName, textureName, color = 0}: ObjectMaterialOptions): boolean {
        return Boolean(amx.callNative("SetObjectMaterial", "iiissi", this.id, index, model, txdName, textureName, color).retval);
    }

    public materialText({text, index = 0, size = ObjectMaterialSize["256x128"], fontFace = "Arial", fontSize = 24, bold = true, color = 0xFFFFFFFF, backgroundColor = 0, align = ObjectMaterialTextAlignments.LEFT}: ObjectMaterialTextOptions): boolean {
        return Boolean(amx.callNative("SetObjectMaterialText", "isiisiiiii", this.id, text, index, size, fontFace, fontSize, Number(bold), color, backgroundColor, align).retval);
    }
}