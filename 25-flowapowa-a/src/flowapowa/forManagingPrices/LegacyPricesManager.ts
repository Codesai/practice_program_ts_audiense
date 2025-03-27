import {DeprecatedPriceProvider} from "./DeprecatedPriceProvider";
import {Element} from "../application/Recipe";
import {PricesManager} from "../application/PricesManager";

export class LegacyPricesManager implements PricesManager {
    private deprecatedPriceProvider: DeprecatedPriceProvider;

    constructor(deprecatedPriceProvider: DeprecatedPriceProvider) {
        this.deprecatedPriceProvider = deprecatedPriceProvider;
    }

    getElementPrice(element: Element): number {
        return this.deprecatedPriceProvider.getPrice(element.name);
    }

    set(element: Element, price: number): void {
        this.deprecatedPriceProvider.add(element.name, price);
    }
}