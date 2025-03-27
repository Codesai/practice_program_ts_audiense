import {aBouquet} from './BouquetBuilder'
import {ReceiptPrinter} from './ReceiptPrinter'
import {Bouquet} from "./Bouquet";

import {PriceProvider} from "./PriceProvider";

export class Flowapowa {
    private receiptPrinter: ReceiptPrinter
    private readonly priceProvider: PriceProvider;

    constructor(receiptPrinter: ReceiptPrinter, priceProvider: PriceProvider) {
        this.receiptPrinter = receiptPrinter;
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
