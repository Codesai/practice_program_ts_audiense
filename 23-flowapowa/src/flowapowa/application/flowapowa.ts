import {aBouquet} from './bouquetBuilder'
import {ReceiptPrinter} from './receiptPrinter'
import {DeprecatedPriceProvider} from "../forGettingPrices/deprecatedPriceProvider";
import {Bouquet} from "./bouquet";

export class Flowapowa {
    private receiptPrinter: ReceiptPrinter
    private priceProvider: DeprecatedPriceProvider;

    constructor(receiptPrinter: ReceiptPrinter, priceProvider: DeprecatedPriceProvider) {
        this.receiptPrinter = receiptPrinter
        this.priceProvider = priceProvider;
    }

    craftBouquet(recipe: string, crafting: number): string {
        const bouquet = this.createBouquet(recipe, crafting);
        return this.receiptPrinter.printReceipt(bouquet);
    }

    private createBouquet(recipe: string, crafting: number): Bouquet {
        return aBouquet().usingPriceProvider(this.priceProvider).usingRawRecipe(recipe).withCrafting(crafting).build();
    }
}
