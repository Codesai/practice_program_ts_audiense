import { Product } from './product'
import { Receipt } from './receipt'

export class Bouquet {
  private readonly craftingPct: number
  private readonly products: Product[]

  constructor(crafting: number) {
    this.craftingPct = crafting
    this.products = []
  }

  addProduct(productName: string, quantity: number, price: number): void {
    this.products.push(new Product(productName, quantity, price))
  }

  receipt(): Receipt {
    const receipt = new Receipt()
    for (const product of this.products) {
      receipt.addProduct(product)
    }
    receipt.addTotal('Crafting', this.crafting())
    receipt.addSeparator()
    receipt.addTotal('Total', this.total())
    return receipt
  }

  private total(): number {
    return this.partial() + this.crafting()
  }

  private partial(): number {
    return this.products.reduce((partial: number, current: Product) => {
      return partial + current.amount()
    }, 0)
  }

  private crafting(): number {
    return (this.partial() * this.craftingPct) / 100
  }
}
