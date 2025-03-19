import {aBouquet} from '../../src/flowapowa/application/bouquetBuilder'
import {DeprecatedPriceProvider} from '../../src/flowapowa/forGettingPrices/deprecatedPriceProvider'

describe('BuildBouquet', () => {
    it('should build a Bouquet from a raw recipe', () => {
        const priceProvider = new DeprecatedPriceProvider()
        priceProvider.add('rose', 1.50)
        const bouquet = aBouquet().usingPriceProvider(priceProvider).usingRawRecipe('rose:12').withCrafting(35).build();
        const expected: string = `Rose        12   1.50   18.00
Crafting                 6.30
-----------------------------
Total                   24.30`.trim()
        expect(bouquet.receipt().print()).toBe(expected)
    })
})
