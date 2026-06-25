import {DoorMechanism} from "../../domain/DoorMechanism";
import {DoorStatus} from "../../domain/DoorStatus";

export class AcmeDoorMechanism implements DoorMechanism {
    unlock(): void {
    }

    status(): DoorStatus {
        return DoorStatus.UNLOCKED;
    }
}
