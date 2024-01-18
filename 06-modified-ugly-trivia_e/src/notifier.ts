export interface Notifier {
    notify(notification: string | undefined): void;
}