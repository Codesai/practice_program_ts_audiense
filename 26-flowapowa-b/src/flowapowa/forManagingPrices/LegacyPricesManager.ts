import {DeprecatedPriceProvider} from "./DeprecatedPriceProvider";
import {PricesManager} from "../application/ports/PricesManager";
import {PriceNotFound} from "../application/PriceNotFound";
import {Price} from "../application/Price";
import {ElementId} from "../application/ElementId";

export class LegacyPricesManager implements PricesManager {
    private deprecatedPriceProvider: DeprecatedPriceProvider;

    constructor(deprecatedPriceProvider: DeprecatedPriceProvider) {
        this.deprecatedPriceProvider = deprecatedPriceProvider;
    }

    getPrice(elementId: ElementId): number {
        const price = this.deprecatedPriceProvider.getPrice(elementId.asString());
        if (price === undefined) {
            throw new PriceNotFound(elementId);
        }
        return price;
    }

    setPrice(elementId: ElementId, price: Price): void {
        this.deprecatedPriceProvider.add(elementId.asString(), price.value());
    }
}