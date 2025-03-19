import {Product} from './product'
import {Receipt} from './receipt'

export class Bouquet {
    private readonly craftingPercentage: number
    private readonly products: Product[]

    constructor(crafting: number) {
        this.craftingPercentage = crafting
        this.products = []
    }

    addProduct(name: string, quantity: number, price: number): void {
        this.products.push(new Product(name, quantity, price));
    }

    receipt(): Receipt {
        const receipt = new Receipt()
        for (const product of this.products) {
            receipt.addProduct(product)
        }
        receipt.addTotal('Crafting', this.partial() * this.craftingFactor())
        receipt.addSeparator()
        receipt.addTotal('Total', this.total())
        return receipt
    }

    private craftingFactor() {
        return this.craftingPercentage / 100;
    }

    private total(): number {
        return this.partial() * (1 + this.craftingFactor())
    }

    private partial(): number {
        return this.products.reduce((acc: number, product: Product) => {
            return acc + product.amount()
        }, 0);
    }
}
