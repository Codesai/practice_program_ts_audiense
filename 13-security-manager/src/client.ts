import {SecurityManager} from "./securityManager";
import {ConsoleNotifier} from "./consoleNotifier";
import {ConsoleInputReader} from "./consoleInputReader";

export class Client {

    public execute(){
        const consoleNotifier = new ConsoleNotifier();
        const consoleInputReader = new ConsoleInputReader();
        const securityManager = new SecurityManager(consoleNotifier, consoleInputReader);
        securityManager.createValidUser();
    }
}