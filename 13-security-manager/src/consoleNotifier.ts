import {Notifier} from "./notifier";

export class ConsoleNotifier implements Notifier {
    notify(message: string): void {
        console.log(message);
    }
}