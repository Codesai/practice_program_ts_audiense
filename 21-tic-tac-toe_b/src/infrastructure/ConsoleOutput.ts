import {Output} from "./Output";

export class ConsoleOutput implements Output {
    display(msg: string): void {
        console.log(msg);
    }
}