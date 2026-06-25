export interface AccessEventsPublisher {
    publish(event: AccessEvents): void;
}

export enum AccessEvents {
    invalidCode = 'invalidCode',
    doorJammed = 'doorJammed'
}