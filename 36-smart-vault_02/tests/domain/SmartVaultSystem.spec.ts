import {SmartVaultSystem} from "../../src/domain/SmartVaultSystem";
import {EmployeeId} from "../../src/domain/EmployeeId";
import {Code} from "../../src/domain/Code";
import {Activity} from "../../src/domain/Activity";
import {DoorMechanism} from "../../src/domain/DoorMechanism";
import {ActivityLog} from "../../src/domain/ActivityLog";
import {DoorStatus} from "../../src/domain/DoorStatus";
import {Display} from "../../src/domain/Display";
import {RegistryService} from "../../src/domain/RegistryService";

describe('SmartVaultSystem', () => {
    let doorMechanism: jest.Mocked<DoorMechanism>;
    let activityLog: jest.Mocked<ActivityLog>;
    let display: jest.Mocked<Display>
    let registryService: jest.Mocked<RegistryService>
    let smartVaultSystem: SmartVaultSystem;

    const employeeId = anEmployeeId("123456789");

    beforeEach(() => {
        doorMechanism = {unlock: jest.fn(), status: jest.fn()};
        activityLog = {log: jest.fn()};
        display = {show: jest.fn()};
        registryService = {canUnlock: jest.fn()};
        smartVaultSystem = new SmartVaultSystem(doorMechanism, activityLog, display, registryService);
    })

    it('as a staff member when I introduce a valid code the door is unlocked', () => {
        registryService.canUnlock.mockReturnValueOnce(true);

        smartVaultSystem.onCodeIntroduced(aCode(), employeeId);

        expect(doorMechanism.unlock).toHaveBeenCalled();
        expect(activityLog.log).toHaveBeenCalledWith(anActivity("Door is unlocked", employeeId));
    });

    it('as a staff member when I introduce a valid code and the door does not unlock, an error is displayed', () => {
        registryService.canUnlock.mockReturnValueOnce(true);
        doorMechanism.status.mockReturnValueOnce(DoorStatus.JAMMED);

        smartVaultSystem.onCodeIntroduced(aCode(), employeeId)

        expect(doorMechanism.unlock).toHaveBeenCalled();
        expect(activityLog.log).toHaveBeenCalledWith(anActivity("Door is jammed, cannot unlock", employeeId));
        expect(display.show).toHaveBeenCalledWith("Door is jammed, could not unlock");
    });

    it('as a staff member when I introduce an incorrect code, an error is displayed and the door is not unlocked', () => {
        registryService.canUnlock.mockReturnValueOnce(false)

        smartVaultSystem.onCodeIntroduced(aCode(), employeeId)

        expect(doorMechanism.unlock).not.toHaveBeenCalled();
        expect(display.show).toHaveBeenCalledWith("You shall not pass!");
    })
});

function aCode(): Code {
    return new Code();
}

function anActivity(message: string, employeeId: EmployeeId): Activity {
    return new Activity(message, employeeId);
}

function anEmployeeId(value: string): EmployeeId {
    return new EmployeeId(value);
}
