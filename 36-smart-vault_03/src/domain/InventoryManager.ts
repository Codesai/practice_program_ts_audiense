import {InventoryScanner} from "./InventoryScanner";
import {CommunicationTerminal} from "./CommunicationTerminal";

export interface InventoryManager {
  restockIfNeeded: () => void;
}

export class AutomaticInventoryManager implements InventoryManager{
  private inventoryScanner: InventoryScanner;
  private communicationTerminal: CommunicationTerminal;

  constructor(inventoryScanner: InventoryScanner, communicationTerminal: CommunicationTerminal) {
    this.communicationTerminal = communicationTerminal;
    this.inventoryScanner = inventoryScanner;
  }

  restockIfNeeded(): void {
    const remainingStock = this.inventoryScanner.remainingStock();

    if (remainingStock === 0) {
      this.communicationTerminal.emergencyAlert();
      return;
    }

    if (remainingStock <= 5) {
      this.communicationTerminal.restockOrder();
    }
  }
}