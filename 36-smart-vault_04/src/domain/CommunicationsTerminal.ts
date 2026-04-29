export enum Order {
    RESTOCK,
    EMERGENCY_ALERT
}

export interface CommunicationsTerminal {
    route(order: Order): void;
}