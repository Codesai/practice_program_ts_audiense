import {DoorMechanism} from "./DoorMechanism";
import {EmployeeId} from "./EmployeeId";
import {DoorStatus} from "./DoorStatus";
import {Door} from "./Door";

export class AutomaticDoor implements Door {
    private readonly doorMechanism: DoorMechanism;

    constructor(doorMechanism: DoorMechanism) {
        this.doorMechanism = doorMechanism;
    }

    unlockFor(id: EmployeeId): void {
        this.doorMechanism.unlock();
    }

    isJammed(): boolean {
        return this.doorMechanism.status() === DoorStatus.JAMMED;
    }
}