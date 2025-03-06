import { Bouquet } from './bouquet'
import { DeprecatedPriceProvider } from '../forGettingPrices/deprecatedPriceProvider'

class Element {
  public readonly name: string
  public readonly quantity: number

  constructor(part: string, quantity: number) {
    this.name = part
    this.quantity = quantity
  }
}

export class Recipe {
  private readonly elements: Element[]

  private constructor() {
    this.elements = []
  }

  public static fromRawRecipe(recipe: string): Recipe {
    const lines = recipe.split(';')

    const newRecipe = new Recipe()
    for (const line of lines) {
      const parts: string[] = line.split(':')
      newRecipe.add(parts[0], +parts[1])
    }
    return newRecipe
  }

  craft(bouquet: Bouquet, priceProvider: DeprecatedPriceProvider): Bouquet {
    for (const element of this.elements) {
      const price = priceProvider.getPrice(element.name)
      bouquet.addProduct(element.name, element.quantity, price)
    }

    return bouquet
  }

  private add(partName: string, quantity: number): void {
    this.elements.push(new Element(partName, quantity))
  }
}
