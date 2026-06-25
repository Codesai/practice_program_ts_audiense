import {ActivityLog} from "../../src/domain/ActivityLog";
import {anActivity, anEmployeeId} from "../helpers/SystemVaultHelpers";
import {DoorMechanism} from "../../src/domain/DoorMechanism";
import {DoorStatus} from "../../src/domain/DoorStatus";
import {Door} from "../../src/domain/Door";
import {DoorFactory} from "../../src/domain/factories/DoorFactory";

describe('An automatic door with Activity Log', () => {
    let doorMechanism: jest.Mocked<DoorMechanism>;
    let activityLog: jest.Mocked<ActivityLog>;
    let door: Door;

    const employeeId = anEmployeeId("123456789");

    beforeEach(() => {
        doorMechanism = {
            status: jest.fn(),
            unlock: jest.fn()
        };
        activityLog = {
            log: jest.fn()
        };

        door = DoorFactory.create(doorMechanism, activityLog);
    });

    it('should log "Door is unlocked" when unlocking successfully', () => {
        doorMechanism.status.mockReturnValue(DoorStatus.UNLOCKED);

        door.unlockFor(employeeId);

        expect(doorMechanism.unlock).toHaveBeenCalled();
        expect(activityLog.log).toHaveBeenCalledWith(anActivity("Door is unlocked", employeeId));
    });

    it('should log "Door is jammed, cannot unlock" when doorMechanism is jammed', () => {
        doorMechanism.status.mockReturnValue(DoorStatus.JAMMED);

        door.unlockFor(employeeId);

        expect(doorMechanism.unlock).toHaveBeenCalled();
        expect(activityLog.log).toHaveBeenCalledWith(anActivity("Door is jammed, cannot unlock", employeeId));
    });
});
