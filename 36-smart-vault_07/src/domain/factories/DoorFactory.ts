import {DoorMechanism} from "../DoorMechanism";
import {ActivityLog} from "../ActivityLog";
import {Door} from "../Door";
import {WithActivityLogDoor} from "../WithActivityLogDoor";
import {AutomaticDoor} from "../AutomaticDoor";

export class DoorFactory {

    static create(doorMechanism: DoorMechanism, activityLog: ActivityLog): Door {
        return new WithActivityLogDoor(new AutomaticDoor(doorMechanism), activityLog);
    }
}