export class OrderDto {
    readonly productName: string;
    readonly priceWithVat: number;
    readonly quantity: number;

    constructor(productName: string, priceWithVat: number, quantity: number) {
        this.productName = productName;
        this.priceWithVat = priceWithVat;
        this.quantity = quantity;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getPriceWithVat(): number {
        return this.priceWithVat;
    }

    getProductName(): string {
        return this.productName;
    }
}
