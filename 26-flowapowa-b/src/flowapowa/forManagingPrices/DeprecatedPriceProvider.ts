export class DeprecatedPriceProvider {
    private prices: { [name: string]: number } = {}

    getPrice(productName: string): number {
        return this.prices[productName]
    }

    add(product: string, number: number): void {
        this.prices[product] = number
    }
}
