import {SmartVaultSystem} from "../../src/domain/SmartVaultSystem";
import {Display} from "../../src/domain/Display";
import {RegistryService} from "../../src/domain/RegistryService";
import {aCode, anEmployeeId} from "../helpers/SystemVaultHelpers";
import {Door} from '../../src/domain/Door';
import {InventoryManager} from "../../src/domain/InventoryManager";
import {AccessEventsPublisher} from "../../src/domain/AccessEventsPublisher";
import {AccessEvents} from "../../src/domain/AccessEvents";

describe('SmartVaultSystem', () => {
    let display: jest.Mocked<Display>;
    let registryService: jest.Mocked<RegistryService>;
    let smartVaultSystem: SmartVaultSystem;
    let door: jest.Mocked<Door>;
    let inventoryManager: jest.Mocked<InventoryManager>;
    let accessEventsPublisher: jest.Mocked<AccessEventsPublisher>;

    const employeeId = anEmployeeId("123456789");

    beforeEach(() => {
        display = {show: jest.fn()};
        registryService = {canUnlock: jest.fn()};
        door = {
            unlockFor: jest.fn(),
            isJammed: jest.fn()
        };
        inventoryManager = {ensureStock: jest.fn()};
        accessEventsPublisher = {publish: jest.fn()} as unknown as jest.Mocked<AccessEventsPublisher>;
        smartVaultSystem = new SmartVaultSystem(registryService, door, inventoryManager,
            accessEventsPublisher);
    })

    describe('on code introduced', () => {
        it('when it is valid, the door is unlocked', () => {
            registryService.canUnlock.mockReturnValueOnce(true);

            smartVaultSystem.onCodeIntroduced(aCode(), employeeId);

            expect(door.unlockFor).toHaveBeenCalledWith(employeeId);
        });

        it('when it is valid and the door is jammed, an error is displayed', () => {
            registryService.canUnlock.mockReturnValueOnce(true);
            door.isJammed.mockReturnValue(true);

            smartVaultSystem.onCodeIntroduced(aCode(), employeeId)

            expect(door.unlockFor).toHaveBeenCalledWith(employeeId);
            expect(accessEventsPublisher.publish).toHaveBeenCalledWith(AccessEvents.doorJammed);
        });

        it('when it is incorrect, an error is displayed and the door is not unlocked', () => {
            registryService.canUnlock.mockReturnValueOnce(false)

            smartVaultSystem.onCodeIntroduced(aCode(), employeeId)

            expect(door.unlockFor).not.toHaveBeenCalled();
            expect(accessEventsPublisher.publish).toHaveBeenCalledWith(AccessEvents.invalidCode);
        });
    });

    describe('on door closed', () => {
        it('the inventory manager ensures the stock', () => {
            smartVaultSystem.onDoorClosed();

            expect(inventoryManager.ensureStock).toHaveBeenCalled();
        });
    });
});



