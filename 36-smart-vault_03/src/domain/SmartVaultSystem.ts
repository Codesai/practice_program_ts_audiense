import {EmployeeId} from "./EmployeeId";
import {Code} from "./Code";
import {Activity} from "./Activity";
import {DoorMechanism} from "./DoorMechanism";
import {ActivityLog} from "./ActivityLog";
import {Display} from "./Display";
import {DoorStatus} from "./DoorStatus";
import {RegistryService} from "./RegistryService";
import {CommunicationTerminal} from "./CommunicationTerminal";
import {InventoryScanner} from "./InventoryScanner";
import {InventoryManager} from "./InventoryManager";

export class SmartVaultSystem {
    private readonly doorMechanism: DoorMechanism;
    private readonly display: Display;
    private readonly registryService: RegistryService;
    private readonly activityLog: ActivityLog;
    private readonly inventoryManager: InventoryManager;

    constructor(doorMechanism: DoorMechanism, activityLog: ActivityLog, display: Display, registryService: RegistryService, inventoryManager: InventoryManager) {
        this.registryService = registryService;
        this.display = display;
        this.doorMechanism = doorMechanism;
        this.activityLog = activityLog;
        this.inventoryManager = inventoryManager;
    }

    onCodeIntroduced(code: Code, id: EmployeeId): void {
        if (!this.registryService.canUnlock(code, id)) {
            this.display.show("You shall not pass!");
            this.activityLog.log(new Activity("Access denied, incorrect code", id));
            return;
        }
        this.doorMechanism.unlock();
        if (this.doorMechanism.status() === DoorStatus.JAMMED) {
            this.activityLog.log(new Activity("Door is jammed, cannot unlock", id));
            this.display.show("Door is jammed, could not unlock");
            return;
        }
        this.activityLog.log(this.anActivity(id, "Door is unlocked"));
    }

    private anActivity(id: EmployeeId, message: string): Activity {
        return new Activity(message, id);
    }

    onDoorClosed():void {
        this.inventoryManager.restockIfNeeded();

    }
}
