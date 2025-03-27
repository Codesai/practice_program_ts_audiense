import {DeprecatedPriceProvider} from '../forManagingPrices/DeprecatedPriceProvider'
import {StringReceiptPrinter} from '../forPrintingRecipes/StringReceiptPrinter'
import {Flowapowa} from '../application/Flowapowa'

import {LegacyPricesManager} from "../forManagingPrices/LegacyPricesManager";
import {PricesManager} from "../application/PricesManager";

function createStringReceiptPrinter(): StringReceiptPrinter {
    return new StringReceiptPrinter()
}

function createLegacyPricesManager(): PricesManager {
    const priceProvider = new DeprecatedPriceProvider()
    priceProvider.add('rose', 1.5)
    priceProvider.add('daisy', 0.8)
    priceProvider.add('lily', 1.3)
    priceProvider.add('sunflower', 1.7)
    priceProvider.add('tulip', 1.1)
    priceProvider.add('foliage', 0.7)
    priceProvider.add('ribbon', 2)
    return new LegacyPricesManager(priceProvider);
}

export class FlowaPowaApp {
    static main(recipe: string): void {
        const flowaPowa: Flowapowa = new Flowapowa(createStringReceiptPrinter(), createLegacyPricesManager())
        console.log('Creating bouquet with recipe: ' + recipe);
        console.log('--------------------------------------------------------------');
        console.log(flowaPowa.craftBouquet(recipe, 30))
    }
}
