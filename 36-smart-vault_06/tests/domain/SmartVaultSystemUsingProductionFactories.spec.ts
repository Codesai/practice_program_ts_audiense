import {SmartVaultSystem} from "../../src/domain/SmartVaultSystem";
import {DoorMechanism} from "../../src/domain/DoorMechanism";
import {ActivityLog} from "../../src/domain/ActivityLog";
import {DoorStatus} from "../../src/domain/DoorStatus";
import {Display} from "../../src/domain/Display";
import {RegistryService} from "../../src/domain/RegistryService";
import {InventoryScanner} from "../../src/domain/InventoryScanner";
import {aCode, anActivity, anEmployeeId} from "../helpers/SystemVaultHelpers";
import {CommunicationsTerminal, Order} from "../../src/domain/CommunicationsTerminal";
import {SmartVaultSystemFactory} from "../../src/infrastructure/appConfiguration/SmartVaultSystemFactory";

describe('SmartVaultSystem using production factories to interact with all ports', () => {
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
        smartVaultSystem = SmartVaultSystemFactory.create(
            activityLog, registryService, doorMechanism, inventoryScanner, communicationsTerminal, display
        );
    })

    describe('on code introduced', () => {
        it('when it is valid and the door is jammed, an error is displayed', () => {
            registryService.canUnlock.mockReturnValueOnce(true);
            doorMechanism.status.mockReturnValue(DoorStatus.JAMMED);

            smartVaultSystem.onCodeIntroduced(aCode(), employeeId)

            expect(doorMechanism.unlock).toHaveBeenCalled();
            expect(activityLog.log).toHaveBeenCalledWith(anActivity("Door is jammed, cannot unlock", employeeId));
            expect(display.show).toHaveBeenCalledWith("Door is jammed, could not unlock");
        });
    });

    describe('on door closed', () => {
        it('when the inventory is empty, both a restock order and an emergency alert order are routed', () => {
            inventoryScanner.numberOfItems.mockReturnValueOnce(0);

            smartVaultSystem.onDoorClosed();

            expect(communicationsTerminal.route).toHaveBeenCalledWith(Order.RESTOCK);
            expect(communicationsTerminal.route).toHaveBeenCalledWith(Order.EMERGENCY_ALERT);
        })
    });
});



