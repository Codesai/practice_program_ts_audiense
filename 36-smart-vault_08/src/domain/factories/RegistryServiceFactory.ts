import {ActivityLog} from "../ActivityLog";
import {RegistryService} from "../RegistryService";
import {WithActivityLogRegistryService} from "../WithActivityLogRegistryService";

export class RegistryServiceFactory {
    static create(activityLog: ActivityLog, registryService: RegistryService): RegistryService {
        return new WithActivityLogRegistryService(activityLog, registryService);
    }
}