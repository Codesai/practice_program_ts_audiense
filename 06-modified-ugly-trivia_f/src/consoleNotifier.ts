import {Notifier} from "./notifier";

export class ConsoleNotifier implements Notifier {
    notify(notification: string | undefined): void {
        console.log(notification);
    }
}