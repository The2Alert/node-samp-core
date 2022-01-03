import {Player} from "..";

export interface GroupElement {
    create?(): any;
    destroy?(): any;
    show?(player: Player): any;
    hide?(player: Player): any;
}

export class Group<Element extends GroupElement = GroupElement> extends Array<Element> {
    public create(): void {
        for(const element of this)
            element.create?.();
    }

    public destroy(): void {
        for(const element of this)
            element.destroy?.();
    }

    public show(player: Player): void {
        for(const element of this)
            element.show?.(player);
    }

    public hide(player: Player): void {
        for(const element of this)
            element.hide?.(player);
    }
}