import {LegacyPricesManager} from "../../src/flowapowa/forManagingPrices/LegacyPricesManager";
import {DeprecatedPriceProvider} from "../../src/flowapowa/forManagingPrices/DeprecatedPriceProvider";
import {PricesManager} from "../../src/flowapowa/application/ports/PricesManager";

export function createPricesManager(): PricesManager {
    return new LegacyPricesManager(new DeprecatedPriceProvider());
}