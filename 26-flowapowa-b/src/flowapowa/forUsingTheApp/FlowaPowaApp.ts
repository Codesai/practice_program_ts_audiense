import {DeprecatedPriceProvider} from '../forManagingPrices/DeprecatedPriceProvider'
import {StringReceiptPrinter} from '../forPrintingRecipes/StringReceiptPrinter'
import {Flowapowa} from '../application/Flowapowa'

import {LegacyPricesManager} from "../forManagingPrices/LegacyPricesManager";
import {PricesManager} from "../application/ports/PricesManager";
import {Price} from "../application/Price";
import {ElementId} from "../application/ElementId";

function createStringReceiptPrinter(): StringReceiptPrinter {
    return new StringReceiptPrinter()
}

function CreatePricesManager(): PricesManager {
    return new LegacyPricesManager(new DeprecatedPriceProvider());
}

function createPrice(idString: string, value: number): Price {
    return new Price(value);
}

function getConfiguredPricesManager(): PricesManager {
    const pricesManager = CreatePricesManager();
    pricesManager.setPrice(ElementId.from('rose'), createPrice('rose', 1.5));
    pricesManager.setPrice(ElementId.from('daisy'), createPrice('daisy', 0.8));
    pricesManager.setPrice(ElementId.from('lily'), createPrice('lily', 1.3));
    pricesManager.setPrice(ElementId.from('sunflower'), createPrice('sunflower', 1.7));
    pricesManager.setPrice(ElementId.from('tulip'), createPrice('tulip', 1.1));
    pricesManager.setPrice(ElementId.from('foliage'), createPrice('foliage', 0.7));
    pricesManager.setPrice(ElementId.from('ribbon'), createPrice('ribbon', 2));
    return pricesManager;
}

function createFlowapowa(): Flowapowa {
    return new Flowapowa(createStringReceiptPrinter(), getConfiguredPricesManager());
}

export class FlowaPowaApp {
    static main(recipe: string): void {
        const flowaPowa: Flowapowa = createFlowapowa();
        console.log('Creating bouquet with recipe: ' + recipe);
        console.log('--------------------------------------------------------------');
        console.log(flowaPowa.craftBouquet(recipe, 30))
    }
}
