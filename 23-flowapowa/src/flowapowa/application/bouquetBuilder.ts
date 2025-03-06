import { Bouquet } from './bouquet'
import { Recipe } from './recipe'
import { DeprecatedPriceProvider } from '../forGettingPrices/deprecatedPriceProvider'

export class BouquetBuilder {
  private readonly priceProvider: DeprecatedPriceProvider

  constructor(priceProvider: DeprecatedPriceProvider) {
    this.priceProvider = priceProvider
  }

  withRecipe(recipe: Recipe, crafting: number): Bouquet {
    return recipe.craft(new Bouquet(crafting), this.priceProvider)
  }
}
