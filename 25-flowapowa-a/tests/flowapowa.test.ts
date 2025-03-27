import {StringReceiptPrinter} from '../src/flowapowa/forPrintingRecipes/StringReceiptPrinter'
import {Flowapowa} from '../src/flowapowa/application/Flowapowa'
import {DeprecatedPriceProvider} from '../src/flowapowa/forManagingPrices/DeprecatedPriceProvider'

import {LegacyPricesManager} from "../src/flowapowa/forManagingPrices/LegacyPricesManager";
import {PricesManager} from "../src/flowapowa/application/PricesManager";

function getStringReceiptPrinter(): StringReceiptPrinter {
    return new StringReceiptPrinter()
}

function createPricesManager(): PricesManager {
    const deprecatedPriceProvider = new DeprecatedPriceProvider()
    deprecatedPriceProvider.add('rose', 1.5)
    deprecatedPriceProvider.add('daisy', 0.8)
    return new LegacyPricesManager(deprecatedPriceProvider);
}

describe('FlowaPowa', () => {
    it('should make a simple bouquet', () => {
        const flowaPowa: Flowapowa = new Flowapowa(getStringReceiptPrinter(), createPricesManager())

        const recipe: string = 'rose:12'
        const result = flowaPowa.craftBouquet(recipe, 35)
        const expected = `Rose        12   1.50   18.00
Crafting                 6.30
-----------------------------
Total                   24.30`.trim()
        expect(result).toBe(expected)
    })

    it('should make a complex bouquet', () => {
        const flowaPowa: Flowapowa = new Flowapowa(getStringReceiptPrinter(), createPricesManager())

        const recipe: string = 'rose:12;daisy:16'
        const result = flowaPowa.craftBouquet(recipe, 35)
        const expected = `Rose        12   1.50   18.00
Daisy       16   0.80   12.80
Crafting                10.78
-----------------------------
Total                   41.58`.trim()
        expect(result).toBe(expected)
    })
})
