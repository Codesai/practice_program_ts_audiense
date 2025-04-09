import {DeprecatedPriceProvider} from "./DeprecatedPriceProvider";
import {PricesManager} from "../application/ports/PricesManager";
import {PriceNotFoundFor} from "../application/PriceNotFoundFor";
import {Price} from "../application/Price";
import {PriceId} from "../application/PriceId";

export class LegacyPricesManager implements PricesManager {
    private deprecatedPriceProvider: DeprecatedPriceProvider;

    constructor(deprecatedPriceProvider: DeprecatedPriceProvider) {
        this.deprecatedPriceProvider = deprecatedPriceProvider;
    }

    getPrice(id: PriceId): number {
        const price = this.deprecatedPriceProvider.getPrice(id.value());
        if (price === undefined) {
            throw new PriceNotFoundFor(id);
        }
        return price;
    }

    setPrice(price: Price): void {
        this.deprecatedPriceProvider.add(price.idAsString(), price.value());
    }
}