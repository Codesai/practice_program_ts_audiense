import {ActivityLog} from "./ActivityLog";
import {EmployeeId} from "./EmployeeId";
import {Activity} from "./Activity";
import {Door} from "./Door";

export class WithActivityLogDoor implements Door {
    private readonly door: Door;
    private readonly activityLog: ActivityLog;

    constructor(door: Door, activityLog: ActivityLog) {
        this.door = door;
        this.activityLog = activityLog;
    }

    unlockFor(id: EmployeeId): void {
        this.door.unlockFor(id);
        if (this.isJammed()) {
            this.activityLog.log(this.anActivity("Door is jammed, cannot unlock", id));
            return;
        }
        this.activityLog.log(this.anActivity("Door is unlocked", id));
    }

    isJammed(): boolean {
        return this.door.isJammed();
    }

    private anActivity(message: string, id: EmployeeId): Activity {
        return new Activity(message, id);
    }
}