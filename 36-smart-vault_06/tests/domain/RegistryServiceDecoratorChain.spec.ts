import {ActivityLog} from "../../src/domain/ActivityLog";
import {aCode, anActivity, anEmployeeId} from "../helpers/SystemVaultHelpers";
import {RegistryService} from "../../src/domain/RegistryService";
import {RegistryServiceFactory} from "../../src/domain/factories/RegistryServiceFactory";

describe('A registry service with an activity log', () => {
    let activityLog: jest.Mocked<ActivityLog>;
    let registryService: jest.Mocked<RegistryService>;
    let concreteRegistryService: RegistryService;

    const employeeId = anEmployeeId("123456789");

    beforeEach(() => {
        activityLog = {log: jest.fn()};
        registryService = {canUnlock: jest.fn()};

        concreteRegistryService = RegistryServiceFactory.create(activityLog, registryService);
    });

    it('should log an activity when access is denied', () => {
        registryService.canUnlock.mockReturnValue(false);

        const canUnlock = concreteRegistryService.canUnlock(aCode(), employeeId);

        expect(activityLog.log).toHaveBeenCalledWith(anActivity("Access denied, incorrect code", employeeId));
        expect(canUnlock).toBe(false);
    })

    it('should not log an activity when access is granted', () => {
        registryService.canUnlock.mockReturnValue(true);

        const canUnlock = concreteRegistryService.canUnlock(aCode(), employeeId);

        expect(activityLog.log).not.toHaveBeenCalled();
        expect(canUnlock).toBe(true);
    })
});
