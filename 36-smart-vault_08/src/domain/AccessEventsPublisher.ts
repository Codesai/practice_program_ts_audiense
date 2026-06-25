import {AccessEvents} from "./AccessEvents";

export interface AccessEventsPublisher {
    publish(event: AccessEvents): void;
}
