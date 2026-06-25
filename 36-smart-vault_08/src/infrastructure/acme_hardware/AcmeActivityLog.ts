import {Activity} from "../../domain/Activity";
import {ActivityLog} from "../../domain/ActivityLog";

export class AcmeActivityLog implements ActivityLog {
    log(activity: Activity): void {
        console.log(activity.toString());
    }
}