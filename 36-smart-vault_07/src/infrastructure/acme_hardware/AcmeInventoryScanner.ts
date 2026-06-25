import {InventoryScanner} from "../../domain/InventoryScanner";

export class AcmeInventoryScanner implements InventoryScanner {
    numberOfItems(): number {
        return 0;
    }
}
