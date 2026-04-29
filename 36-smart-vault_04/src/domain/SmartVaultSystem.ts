import {EmployeeId} from "./EmployeeId";
import {Code} from "./Code";
import {Activity} from "./Activity";
import {DoorMechanism} from "./DoorMechanism";
import {ActivityLog} from "./ActivityLog";
import {Display} from "./Display";
import {RegistryService} from "./RegistryService";
import {InventoryScanner} from "./InventoryScanner";
import {Door} from "./Door";
import {AutomaticDoor} from "./AutomaticDoor";
import {WithActivityLogDoor} from "./WithActivityLogDoor";
import {CommunicationsTerminal, Order} from "./CommunicationsTerminal";

export class SmartVaultSystem {
    private readonly display: Display;
    private readonly registryService: RegistryService;
    private readonly activityLog: ActivityLog;
    private readonly inventoryScanner: InventoryScanner;
    private readonly door: Door;
    private readonly communicationsTerminal: CommunicationsTerminal;

    constructor(doorMechanism: DoorMechanism, activityLog: ActivityLog, display: Display,
                registryService: RegistryService, inventoryScanner: InventoryScanner, communicationsTerminal: CommunicationsTerminal) {
        this.registryService = registryService;
        this.display = display;
        this.activityLog = activityLog;
        this.inventoryScanner = inventoryScanner;
        this.communicationsTerminal = communicationsTerminal;
        this.door = new WithActivityLogDoor(new AutomaticDoor(doorMechanism), activityLog);
    }

    onCodeIntroduced(code: Code, id: EmployeeId): void {
        if (!this.registryService.canUnlock(code, id)) {
            this.display.show("You shall not pass!");
            this.activityLog.log(new Activity("Access denied, incorrect code", id));
            return;
        }
        this.door.unlockFor(id);
        if (this.door.isJammed()) {
            this.display.show("Door is jammed, could not unlock");
            return;
        }
    }

    onDoorClosed(): void {
        const numberOfItems = this.inventoryScanner.numberOfItems();
        if (numberOfItems <= 5) {
            this.communicationsTerminal.route(Order.RESTOCK);
        }
        if (numberOfItems === 0) {
            this.communicationsTerminal.route(Order.EMERGENCY_ALERT);
        }
    }
}
