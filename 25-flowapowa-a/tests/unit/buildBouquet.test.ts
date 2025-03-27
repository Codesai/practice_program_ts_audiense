import {aBouquet} from '../../src/flowapowa/application/BouquetBuilder'
import {DeprecatedPriceProvider} from "../../src/flowapowa/forManagingPrices/DeprecatedPriceProvider";
import {LegacyPricesManager} from "../../src/flowapowa/forManagingPrices/LegacyPricesManager";
import {PricesManager} from "../../src/flowapowa/application/PricesManager";

function createPricesManager(productName: string, price: number): PricesManager {
    const priceProvider = new DeprecatedPriceProvider();
    priceProvider.add(productName, price)
    return new LegacyPricesManager(priceProvider);
}

describe('BuildBouquet', () => {
    it('should build a Bouquet from a raw recipe', () => {
        const priceProvider = createPricesManager('rose', 1.50);
        const bouquet = aBouquet().usingPriceProvider(priceProvider).usingRawRecipe('rose:12').withCrafting(35).build();
        const expected: string = `Rose        12   1.50   18.00
Crafting                 6.30
-----------------------------
Total                   24.30`.trim()
        expect(bouquet.receipt().print()).toBe(expected)
    })
})
