import {CommunicationsTerminal, Order} from "./CommunicationsTerminal";
import {InventoryScanner} from "./InventoryScanner";

export class InventoryManager {
    private readonly communicationsTerminal: CommunicationsTerminal;
    private readonly inventoryScanner: InventoryScanner;

    constructor(inventoryScanner: InventoryScanner, communicationsTerminal: CommunicationsTerminal) {
        this.communicationsTerminal = communicationsTerminal;
        this.inventoryScanner = inventoryScanner;
    }

    ensureStock(): void {
        const numberOfItems = this.inventoryScanner.numberOfItems();
        if (numberOfItems <= 5) {
            this.communicationsTerminal.route(Order.RESTOCK);
        }
        if (numberOfItems === 0) {
            this.communicationsTerminal.route(Order.EMERGENCY_ALERT);
        }
    }

}