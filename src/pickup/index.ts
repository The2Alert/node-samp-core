import * as amx from "@sa-mp/amx";
import {Position} from "..";

export interface PickupOptions extends Position {
    model: number;
    type: number;
    world?: number;
}

export class Pickup {
    public static addStatic({model, type, x, y, z, world = 0}: PickupOptions): boolean {
        return Boolean(amx.callNative("AddStaticPickup", "iifffi", model, type, x, y, z, world).retval);
    }

    public static create(options: PickupOptions): Pickup {
        const pickup = new Pickup(options);
        return pickup.create();
    }

    public static getById(id: number): Pickup {
        return new Pickup(id);
    }

    public id: number = -1;

    constructor(public readonly idOrOptions: number | PickupOptions) {
        if(typeof idOrOptions === "number")
            this.id = idOrOptions;
    }

    public create(): Pickup {
        if(typeof this.idOrOptions === "number")
            return this;
        const options: PickupOptions = this.idOrOptions;
        const {model, type, x, y, z, world = 0} = options;
        this.id = amx.callNative("CreatePickup", "iifffi", model, type, x, y, z, world).retval; 
        return this;
    }

    public destroy(): void {
        amx.callNative("DestroyPickup", "i", this.id);
    }

    public is(pickup: Pickup): boolean {
        return this.id === pickup.id;
    }
}