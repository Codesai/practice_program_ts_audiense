import {ContentDisplay} from "../ContentDisplay";
import {CartContent} from "../CartContent";
import {Display} from "./Display";

export class ConsoleContentDisplay implements ContentDisplay {
    private readonly display: Display;

    constructor(display: Display) {
        this.display = display;
    }

    show(content: CartContent): void {
        this.display.show('Cart is empty');
    }
}