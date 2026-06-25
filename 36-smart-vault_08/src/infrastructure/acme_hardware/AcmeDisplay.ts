import {Display} from "../../domain/Display";

export class AcmeDisplay implements Display {
    show(message: string): void {
        console.log(message);
    }
}
