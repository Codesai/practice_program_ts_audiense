import {Input} from "../app/ports/Input";
import input from "readline-sync";

export class ConsoleInput implements Input {
    read(): string {
        return input.question();
    }
}