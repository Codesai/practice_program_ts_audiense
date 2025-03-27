import {Bouquet} from './Bouquet'
import {Recipe} from './Recipe'
import {PriceProvider} from "./PriceProvider";

export function aBouquet(): BouquetBuilder {
    return new BouquetBuilder();
}

class BouquetBuilder {
    private recipe: Recipe;
    private crafting: number;
    private priceProvider: PriceProvider;

    public constructor() {
    }

    usingRawRecipe(rawRecipe: string): BouquetBuilder {
        this.recipe = Recipe.fromRawRecipe(rawRecipe)
        return this;
    }

    withCrafting(crafting: number): BouquetBuilder {
        this.crafting = crafting;
        return this;
    }

    usingPriceProvider(priceProvider: PriceProvider): BouquetBuilder {
        this.priceProvider = priceProvider;
        return this;
    }

    build(): Bouquet {
        return this.recipe.craft(new Bouquet(this.crafting), this.priceProvider);
    }
}
