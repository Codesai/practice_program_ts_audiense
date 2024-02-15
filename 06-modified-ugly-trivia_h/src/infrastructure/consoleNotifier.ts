import {Notifier} from "../domain/notifier";

export class ConsoleNotifier implements Notifier {
    notify(notification: string): void {
        console.log(notification);
    }
}