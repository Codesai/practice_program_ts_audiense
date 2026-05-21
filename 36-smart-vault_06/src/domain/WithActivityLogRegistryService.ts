import {ActivityLog} from "./ActivityLog";
import {Code} from "./Code";
import {EmployeeId} from "./EmployeeId";
import {RegistryService} from "./RegistryService";
import {Activity} from "./Activity";

export class WithActivityLogRegistryService implements RegistryService {
    private readonly activityLog: ActivityLog;
    private readonly registryService: RegistryService;

    constructor(activityLog: ActivityLog, registryService: RegistryService) {
        this.activityLog = activityLog;
        this.registryService = registryService;
    }

    canUnlock(code: Code, id: EmployeeId): boolean {
        let canUnlock = this.registryService.canUnlock(code, id);

        if (!canUnlock) {
            this.activityLog.log(new Activity("Access denied, incorrect code", id));
        }

        return canUnlock;
    }
}