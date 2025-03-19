import {Bouquet} from './bouquet'
import {Recipe} from './recipe'
import {DeprecatedPriceProvider} from "../forGettingPrices/deprecatedPriceProvider";

export function aBouquet(): BouquetBuilder {
    return new BouquetBuilder();
}

class BouquetBuilder {
    private priceProvider: DeprecatedPriceProvider;
    private recipe: Recipe;
    private crafting: number;

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

    usingPriceProvider(priceProvider: DeprecatedPriceProvider): BouquetBuilder {
        this.priceProvider = priceProvider;
        return this;
    }

    build(): Bouquet {
        return this.recipe.craft(new Bouquet(this.crafting), this.priceProvider)
    }
}
