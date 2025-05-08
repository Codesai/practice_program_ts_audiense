
export interface Notifier {
    notify(state: "activated" | "deactivated"): void;
}
