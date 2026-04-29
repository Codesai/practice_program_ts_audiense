import {DoorStatus} from "./DoorStatus";

export interface DoorMechanism {
    unlock(): void;

    status(): DoorStatus
}

