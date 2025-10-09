export class Order {
    private readonly productName: string;
    private readonly priceWithVat: number;
    private readonly quantity: number;

    constructor(productName: string, priceWithVat: number, quantity: number) {
        this.productName = productName;
        this.priceWithVat = priceWithVat;
        this.quantity = quantity;
    }
}
