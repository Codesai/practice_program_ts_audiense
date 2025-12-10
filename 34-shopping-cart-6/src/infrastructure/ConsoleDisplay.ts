import {Display} from "./Display";

export class ConsoleDisplay implements Display{
    show(content: string): void {
        console.log(content);
    }
}