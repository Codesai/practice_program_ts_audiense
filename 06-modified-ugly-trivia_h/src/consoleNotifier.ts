import {Notifier} from "./notifier";

export class ConsoleNotifier implements Notifier {
    notify(notification: string): void {
        console.log(notification);
    }
}