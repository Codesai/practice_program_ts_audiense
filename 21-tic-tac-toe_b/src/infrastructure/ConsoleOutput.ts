import {Output} from "../app/ports/Output";

export class ConsoleOutput implements Output {
    display(msg: string): void {
        console.log(msg);
    }
}