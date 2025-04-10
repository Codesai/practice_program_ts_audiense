import {PricesManager} from "../application/ports/PricesManager";
import {NewVendorProductProvider} from "../lib/NewVendorProductProvider";
import {VendorProduct} from "../lib/VendorProduct";
import {PriceNotFound} from "../application/PriceNotFound";
import {Price} from "../application/Price";
import {ElementId} from "../application/ElementId";

export class NewVendorPricesManager implements PricesManager {
    private productProvider: NewVendorProductProvider;

    constructor(productProvider: NewVendorProductProvider) {
        this.productProvider = productProvider;
    }

    getPrice(elementId: ElementId): number {
        const product = this.productProvider.getProductByName(elementId.asString());
        if (!product) {
            throw new PriceNotFound(elementId);
        }
        return product.unitPrice;
    }

    setPrice(elementId: ElementId, price: Price): void {
        this.productProvider.store(new VendorProduct(elementId.asString(), price.value()));
    }
}
