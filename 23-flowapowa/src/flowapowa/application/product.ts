export class Product {
  name: string
  quantity: number
  price: number

  constructor(name: string, quantity: number, price: number) {
    this.name = name
    this.quantity = quantity
    this.price = price
  }

  amount(): number {
    return this.quantity * this.price
  }
}
