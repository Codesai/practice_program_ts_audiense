import {PricesManager} from "../application/ports/PricesManager";
import {NewVendorProductProvider} from "../lib/NewVendorProductProvider";
import {VendorProduct} from "../lib/VendorProduct";
import {PriceNotFoundFor} from "../application/PriceNotFoundFor";
import {Price} from "../application/Price";
import {PriceId} from "../application/PriceId";

export class NewVendorPricesManager implements PricesManager {
    private productProvider: NewVendorProductProvider;

    constructor(productProvider: NewVendorProductProvider) {
        this.productProvider = productProvider;
    }

    getPrice(id: PriceId): number {
        const product = this.productProvider.getProductByName(id.value());
        if (!product) {
            throw new PriceNotFoundFor(id);
        }
        return product.unitPrice;
    }

    setPrice(price: Price): void {
        this.productProvider.store(new VendorProduct(price.idAsString(), price.value()));
    }
}
