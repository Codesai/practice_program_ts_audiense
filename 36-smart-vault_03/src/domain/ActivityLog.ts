import {Activity} from "./Activity";

export interface ActivityLog {
    log(activity: Activity): void;
}
