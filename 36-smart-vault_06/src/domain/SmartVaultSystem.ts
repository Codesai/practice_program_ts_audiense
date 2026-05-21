import {EmployeeId} from './EmployeeId';
import {Code} from './Code';
import {Display} from './Display';
import {RegistryService} from './RegistryService';
import {Door} from './Door';
import {InventoryManager} from './InventoryManager';

export class SmartVaultSystem {
    private readonly display: Display;
    private readonly registryService: RegistryService;
    private readonly door: Door;
    private readonly inventoryManager: InventoryManager;

    constructor(display: Display, registryService: RegistryService, door: Door, inventoryManager: InventoryManager) {
        this.registryService = registryService;
        this.display = display;
        this.door = door;
        this.inventoryManager = inventoryManager;
    }

    onCodeIntroduced(code: Code, id: EmployeeId): void {
        if (!this.registryService.canUnlock(code, id)) {
            this.display.show("You shall not pass!");
            return;
        }
        this.door.unlockFor(id);
        if (this.door.isJammed()) {
            this.display.show("Door is jammed, could not unlock");
            return;
        }
    }

    onDoorClosed(): void {
        this.inventoryManager.ensureStock();
    }
}
