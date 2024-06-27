export class OrderDto {
    private symbol: string;
    private quantity: number;
    private price: number;

    constructor(symbol: string, quantity: number, price: number) {
        this.symbol = symbol;
        this.quantity = quantity;
        this.price = price;
    }
}