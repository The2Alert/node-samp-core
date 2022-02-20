import * as amx from "@sa-mp/amx";
import {Position, Player, Vehicle, constants} from "..";

export interface PlayerText3DLabelOptions extends Position {
    player: Player;
    text: string;
    color?: number;
    drawDistance: number;
    attachedPlayer?: Player;
    attachedVehicle?: Vehicle;
    testLOS?: boolean;
}

export class PlayerText3DLabel {
    public static create(options: PlayerText3DLabelOptions): PlayerText3DLabel {
        const playerText = new PlayerText3DLabel(options);
        return playerText.create();
    }

    public static getById(id: number): PlayerText3DLabel {
        return new PlayerText3DLabel(id);
    }

    public id: number = -1;

    constructor(public readonly idOrOptions: number | PlayerText3DLabelOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): PlayerText3DLabel {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: PlayerText3DLabelOptions = this.idOrOptions;
        const {
            player, 
            text, 
            color = 0xFFFFFFAA, 
            x, 
            y, 
            z, 
            drawDistance, 
            attachedPlayer = new Player(constants.INVALID_PLAYER_ID), 
            attachedVehicle = new Vehicle(constants.INVALID_VEHICLE_ID), 
            testLOS = false
        } = options;
        this.id = amx.callNative("CreatePlayer3DTextLabel", "isiffffiii", player.id, text, color, x, y, z, drawDistance, attachedPlayer.id, attachedVehicle.id, Number(testLOS)).retval;
        return this;
    }

    public delete(player: Player): boolean {
        return Boolean(amx.callNative("DeletePlayer3DTextLabel", "ii", player.id, this.id).retval);
    }

    public update(player: Player, text: string, color: number = 0xFFFFFFAA): void {
        amx.callNative("UpdatePlayer3DTextLabelText", "iiis", player.id, this.id, color, text);
    }

    public is(label: PlayerText3DLabel): boolean {
        return this.id === label.id;
    }
}