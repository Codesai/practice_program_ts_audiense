import { Bouquet } from './bouquet'
import { BouquetBuilder } from './bouquetBuilder'
import { Recipe } from './recipe'

export class BuildBouquet {
  private bouquetBuilder: BouquetBuilder

  constructor(bouquetBuilder: BouquetBuilder) {
    this.bouquetBuilder = bouquetBuilder
  }

  withRecipe(rawRecipe: string, crafting: number): Bouquet {
    const recipe: Recipe = Recipe.fromRawRecipe(rawRecipe)
    return this.bouquetBuilder.withRecipe(recipe, crafting)
  }
}
