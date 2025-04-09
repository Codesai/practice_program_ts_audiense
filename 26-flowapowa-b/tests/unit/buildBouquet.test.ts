import {aBouquet} from '../../src/flowapowa/application/BouquetBuilder'
import {PricesManager} from "../../src/flowapowa/application/ports/PricesManager";
import {createPricesManager} from "../helpers/PricesManagerFactory";
import {aPrice} from "../helpers/PricesHelper";

function createConfiguredPricesManager(): PricesManager {
    const pricesManager = createPricesManager();
    pricesManager.setPrice(aPrice().forElement("rose").withValue(1.50).build());
    return pricesManager;
}

describe('BuildBouquet', () => {
    it('should build a Bouquet from a raw recipe', () => {
        const priceProvider = createConfiguredPricesManager();
        const bouquet = aBouquet().usingPriceProvider(priceProvider).usingRawRecipe('rose:12').withCrafting(35).build();
        const expected: string = `Rose        12   1.50   18.00
Crafting                 6.30
-----------------------------
Total                   24.30`.trim()
        expect(bouquet.receipt().print()).toBe(expected)
    })
})
