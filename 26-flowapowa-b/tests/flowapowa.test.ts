import {StringReceiptPrinter} from '../src/flowapowa/forPrintingRecipes/StringReceiptPrinter'
import {Flowapowa} from '../src/flowapowa/application/Flowapowa'
import {PricesManager} from "../src/flowapowa/application/ports/PricesManager";
import {createPricesManager} from "./helpers/PricesManagerFactory";
import {newPrice} from "./helpers/PricesHelper";
import {ElementId} from "../src/flowapowa/application/ElementId";

function createStringReceiptPrinter(): StringReceiptPrinter {
    return new StringReceiptPrinter()
}

function getConfiguredPricesManager(): PricesManager {
    const pricesManager = createPricesManager();
    pricesManager.setPrice(ElementId.from('rose'), newPrice(1.5));
    pricesManager.setPrice(ElementId.from('daisy'), newPrice(0.8));
    return pricesManager;
}

describe('FlowaPowa', () => {
    it('should make a simple bouquet', () => {
        const flowaPowa: Flowapowa = new Flowapowa(createStringReceiptPrinter(), getConfiguredPricesManager())

        const recipe: string = 'rose:12'
        const result = flowaPowa.craftBouquet(recipe, 35)
        const expected = `Rose        12   1.50   18.00
Crafting                 6.30
-----------------------------
Total                   24.30`.trim()
        expect(result).toBe(expected)
    })

    it('should make a complex bouquet', () => {
        const flowaPowa: Flowapowa = new Flowapowa(createStringReceiptPrinter(), getConfiguredPricesManager())

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
