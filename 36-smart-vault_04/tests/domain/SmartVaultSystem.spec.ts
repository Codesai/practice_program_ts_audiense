import {SmartVaultSystem} from "../../src/domain/SmartVaultSystem";
import {DoorMechanism} from "../../src/domain/DoorMechanism";
import {ActivityLog} from "../../src/domain/ActivityLog";
import {DoorStatus} from "../../src/domain/DoorStatus";
import {Display} from "../../src/domain/Display";
import {RegistryService} from "../../src/domain/RegistryService";
import {InventoryScanner} from "../../src/domain/InventoryScanner";
import {aCode, anActivity, anEmployeeId} from "../helpers/SystemVaultHelpers";
import {CommunicationsTerminal, Order} from "../../src/domain/CommunicationsTerminal";

describe('SmartVaultSystem', () => {
    let doorMechanism: jest.Mocked<DoorMechanism>;
    let activityLog: jest.Mocked<ActivityLog>;
    let display: jest.Mocked<Display>;
    let registryService: jest.Mocked<RegistryService>;
    let inventoryScanner: jest.Mocked<InventoryScanner>;
    let smartVaultSystem: SmartVaultSystem;
    let communicationsTerminal: jest.Mocked<CommunicationsTerminal>;

    const employeeId = anEmployeeId("123456789");

    beforeEach(() => {
        doorMechanism = {unlock: jest.fn(), status: jest.fn()};
        activityLog = {log: jest.fn()};
        display = {show: jest.fn()};
        registryService = {canUnlock: jest.fn()};
        inventoryScanner = {numberOfItems: jest.fn()};
        communicationsTerminal = {route: jest.fn()};
        smartVaultSystem = new SmartVaultSystem(doorMechanism, activityLog, display, registryService, inventoryScanner, communicationsTerminal);
    })

    describe('on code introduced', () => {
        it('when it is valid, the door is unlocked', () => {
            registryService.canUnlock.mockReturnValueOnce(true);

            smartVaultSystem.onCodeIntroduced(aCode(), employeeId);

            expect(doorMechanism.unlock).toHaveBeenCalled();
            expect(activityLog.log).toHaveBeenCalledWith(anActivity("Door is unlocked", employeeId));
        });

        it('when it is valid and the door is jammed, an error is displayed', () => {
            registryService.canUnlock.mockReturnValueOnce(true);
            doorMechanism.status.mockReturnValue(DoorStatus.JAMMED);

            smartVaultSystem.onCodeIntroduced(aCode(), employeeId)

            expect(doorMechanism.unlock).toHaveBeenCalled();
            expect(activityLog.log).toHaveBeenCalledWith(anActivity("Door is jammed, cannot unlock", employeeId));
            expect(display.show).toHaveBeenCalledWith("Door is jammed, could not unlock");
        });

        it('when it is incorrect, an error is displayed and the door is not unlocked', () => {
            registryService.canUnlock.mockReturnValueOnce(false)

            smartVaultSystem.onCodeIntroduced(aCode(), employeeId)

            expect(doorMechanism.unlock).not.toHaveBeenCalled();
            expect(activityLog.log).toHaveBeenCalledWith(anActivity("Access denied, incorrect code", employeeId));
            expect(display.show).toHaveBeenCalledWith("You shall not pass!");
        })
    });

    describe('on door closed', () => {
        it.each([
            1,
            5]
        )('when there are 5 or less items in the inventory, a restock order is routed (numberOfItems: %i)', (numberOfItems) => {
            inventoryScanner.numberOfItems.mockReturnValueOnce(numberOfItems);

            smartVaultSystem.onDoorClosed()

            expect(communicationsTerminal.route).toHaveBeenCalledWith(Order.RESTOCK);
            expect(communicationsTerminal.route).not.toHaveBeenCalledWith(Order.EMERGENCY_ALERT);
        })

        it('when there more than 5 in the inventory, nothing happens', () => {
            inventoryScanner.numberOfItems.mockReturnValueOnce(6);

            smartVaultSystem.onDoorClosed()

            expect(communicationsTerminal.route).not.toHaveBeenCalled();
        })

        it('when the inventory is empty, both a restock order and an emergency alert order are routed', () => {
            inventoryScanner.numberOfItems.mockReturnValueOnce(0);

            smartVaultSystem.onDoorClosed()

            expect(communicationsTerminal.route).toHaveBeenCalledWith(Order.RESTOCK);
            expect(communicationsTerminal.route).toHaveBeenCalledWith(Order.EMERGENCY_ALERT);
        })
    });
});



