import {EmployeeId} from './EmployeeId';
import {Code} from './Code';
import {RegistryService} from './RegistryService';
import {Door} from './Door';
import {InventoryManager} from './InventoryManager';
import {AccessEvents, AccessEventsPublisher} from "./AccessEventsPublisher";


export class SmartVaultSystem {
    private readonly registryService: RegistryService;
    private readonly door: Door;
    private readonly inventoryManager: InventoryManager;
    private eventPublisher: AccessEventsPublisher;

    constructor(registryService: RegistryService, door: Door, inventoryManager: InventoryManager, eventsPublisher: AccessEventsPublisher) {
        this.registryService = registryService;
        this.door = door;
        this.inventoryManager = inventoryManager;
        this.eventPublisher = eventsPublisher;
    }

    onCodeIntroduced(code: Code, id: EmployeeId): void {
        if (!this.registryService.canUnlock(code, id)) {
            this.eventPublisher.publish(AccessEvents.invalidCode);
            return;
        }
        this.door.unlockFor(id);
        if (this.door.isJammed()) {
            this.eventPublisher.publish(AccessEvents.doorJammed);
            return;
        }
    }

    onDoorClosed(): void {
        this.inventoryManager.ensureStock();
    }
}
