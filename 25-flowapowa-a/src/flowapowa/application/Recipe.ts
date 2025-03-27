import {Bouquet} from './Bouquet'
import {PriceProvider} from "./PriceProvider";

export class Element {
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

    craft(bouquet: Bouquet, priceProvider: PriceProvider): Bouquet {
        for (const element of this.elements) {
            this.addElementToBouquet(priceProvider, bouquet, element);
        }
        return bouquet;
    }



    private addElementToBouquet(priceProvider: PriceProvider, bouquet: Bouquet, element: Element): void {
        const price = priceProvider.getElementPrice(element);
        bouquet.addProduct(element.name, element.quantity, price)
    }

    private add(partName: string, quantity: number): void {
        this.elements.push(new Element(partName, quantity))
    }
}
