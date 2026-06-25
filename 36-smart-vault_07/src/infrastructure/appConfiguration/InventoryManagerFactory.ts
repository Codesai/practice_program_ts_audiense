import {InventoryScanner} from "../../domain/InventoryScanner";
import {CommunicationsTerminal} from "../../domain/CommunicationsTerminal";
import {SimpleInventoryManager} from "../../domain/SimpleInventoryManager";
import {InventoryManager} from "../../domain/InventoryManager";

export class InventoryManagerFactory {
    public static create(inventoryScanner: InventoryScanner, communicationsTerminal: CommunicationsTerminal): InventoryManager {
        return new SimpleInventoryManager(inventoryScanner, communicationsTerminal);
    }
}
