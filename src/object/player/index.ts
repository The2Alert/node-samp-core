import * as amx from "@sa-mp/amx";
import {Player, ObjectOptions, Position, Vehicle, MoveObjectOptions, ObjectMaterialOptions, ObjectMaterialSize, ObjectMaterialTextAlignments, ObjectMaterialTextOptions, constants} from "../..";

export interface PlayerObjectAttachOptions {
    offset: Position;
    rot: Position;
}

export class PlayerObject {
    public static create(options: ObjectOptions, player: Player): PlayerObject {
        const object = new PlayerObject(options, player);
        return object;
    }

    public static isValid(object: PlayerObject): boolean {
        return Boolean(amx.callNative("IsValidPlayerObject", "ii", object.player.id, object.id).retval);
    }

    public static getById(id: number, player: Player): PlayerObject {
        return new PlayerObject(id, player);
    }

    public id: number = constants.INVALID_OBJECT_ID;

    constructor(public readonly idOrOptions: ObjectOptions | number, public readonly player: Player) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): PlayerObject {
        if(typeof this.idOrOptions === "number")
            return this;
        const {model, x, y, z, rot, drawDistance = 0} = this.idOrOptions;
        this.id = amx.callNative("CreatePlayerObject", "iifffffff", this.player.id, model, x, y, z, rot.x, rot.y, rot.z, drawDistance).retval;
        return this;
    }

    public attach(attached: Vehicle, {offset, rot}: PlayerObjectAttachOptions): void {
        amx.callNative("AttachPlayerObjectToVehicle", "iiiffffff", this.player.id, this.id, attached.id, offset.x, offset.y, offset.z, rot.x, rot.y, rot.z);
    }

    public set pos({x, y, z}: Position) {
        amx.callNative("SetPlayerObjectPos", "iifff", this.player.id, this.id, x, y, z);
    }

    public get pos(): Position {
        const [x, y, z] = amx.callNative("GetPlayerObjectPos", "iiFFF", this.player.id, this.id) as number[];
        return {x, y, z};
    }

    public set rot({x, y, z}: Position) {
        amx.callNative("SetPlayerObjectRot", "iifff", this.player.id, this.id, x, y, z);
    }

    public get rot(): Position {
        const [x, y, z] = amx.callNative("GetPlayerObjectRot", "iiFFF", this.player.id, this.id) as number[];
        return {x, y, z};
    }

    public get model(): number {
        return amx.callNative("GetPlayerObjectModel", "ii", this.player.id, this.id).retval;
    }

    public noCameraCol(): void {
        amx.callNative("SetPlayerObjectNoCameraCol", "ii", this.player.id, this.id);
    }

    public destroy(): void {
        amx.callNative("DestroyPlayerObject", "ii", this.player.id, this.id);
    }

    public move({x, y, z, speed, rot = {x: -1000, y: -1000, z: -1000}}: MoveObjectOptions): number {
        return amx.callNative("MovePlayerObject", "iifffffff", this.player.id, this.id, x, y, z, speed, rot.x, rot.y, rot.z).retval;
    }

    public stop(): void {
        amx.callNative("StopPlayerObject", "ii", this.player.id, this.id);
    }

    public moving(): boolean {
        return Boolean(amx.callNative("IsPlayerObjectMoving", "ii", this.player.id, this.id).retval);
    }

    public edit(): boolean {
        return Boolean(amx.callNative("EditPlayerObject", "ii", this.player.id, this.id).retval);
    }

    public material({index, model, txdName, textureName, color = 0}: ObjectMaterialOptions): void {
        amx.callNative("SetPlayerObjectMaterial", "iiiissi", this.player.id, this.id, index, model, txdName, textureName, color);
    }

    public materialText({text, index = 0, size = ObjectMaterialSize["256x128"], fontFace = "Arial", fontSize = 24, bold = true, color = 0xFFFFFFFF, backgroundColor = 0, align = ObjectMaterialTextAlignments.LEFT}: ObjectMaterialTextOptions): void {
        amx.callNative("SetPlayerObjectMaterialText", "iisiisiiiii", this.player.id, this.id, text, index, size, fontFace, fontSize, Number(bold), color, backgroundColor, align);
    }
}