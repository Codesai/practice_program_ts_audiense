import {DeprecatedPriceProvider} from '../forManagingPrices/DeprecatedPriceProvider'
import {StringReceiptPrinter} from '../forPrintingRecipes/StringReceiptPrinter'
import {Flowapowa} from '../application/Flowapowa'

import {LegacyPricesManager} from "../forManagingPrices/LegacyPricesManager";
import {PricesManager} from "../application/ports/PricesManager";
import {Price} from "../application/Price";
import {PriceId} from "../application/PriceId";

function createStringReceiptPrinter(): StringReceiptPrinter {
    return new StringReceiptPrinter()
}

function CreatePricesManager(): PricesManager {
    return new LegacyPricesManager(new DeprecatedPriceProvider());
}

function createPrice(idString: string, value: number): Price {
    return new Price(PriceId.from(idString), value);
}

function getConfiguredPricesManager(): PricesManager {
    const pricesManager = CreatePricesManager();
    pricesManager.setPrice(createPrice('rose', 1.5));
    pricesManager.setPrice(createPrice('daisy', 0.8));
    pricesManager.setPrice(createPrice('lily', 1.3));
    pricesManager.setPrice(createPrice('sunflower', 1.7));
    pricesManager.setPrice(createPrice('tulip', 1.1));
    pricesManager.setPrice(createPrice('foliage', 0.7));
    pricesManager.setPrice(createPrice('ribbon', 2));
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
