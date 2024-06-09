import {InputReader} from "./inputReader";
import * as readline from "readline-sync";

export class ConsoleInputReader implements InputReader {
    read(): string {
        return readline.question();
    }
}