import {Display} from "../display";

export class ConsoleDisplay implements Display {
    showText(text: string): void {
        console.log(text);
    }
}