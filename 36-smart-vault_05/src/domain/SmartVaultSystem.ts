import {EmployeeId} from "./EmployeeId";
import {Code} from "./Code";
import {DoorMechanism} from "./DoorMechanism";
import {ActivityLog} from "./ActivityLog";
import {Display} from "./Display";
import {RegistryService} from "./RegistryService";
import {InventoryScanner} from "./InventoryScanner";
import {Door} from "./Door";
import {CommunicationsTerminal} from "./CommunicationsTerminal";
import {InventoryManager} from "./InventoryManager";
import {DoorFactory} from "./factories/DoorFactory";
import {RegistryServiceFactory} from "./factories/RegistryServiceFactory";

export class SmartVaultSystem {
    private readonly display: Display;
    private readonly registryService: RegistryService;
    private readonly door: Door;
    private readonly inventoryManager: InventoryManager;

    constructor(doorMechanism: DoorMechanism, activityLog: ActivityLog, display: Display,
                registryService: RegistryService, inventoryScanner: InventoryScanner,
                communicationsTerminal: CommunicationsTerminal) {
        this.registryService = RegistryServiceFactory.create(activityLog, registryService);
        this.display = display;
        this.door = DoorFactory.create(doorMechanism, activityLog);
        this.inventoryManager = new InventoryManager(inventoryScanner, communicationsTerminal);
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
