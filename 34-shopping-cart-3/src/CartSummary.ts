import {OrderDto} from "./OrderDto";

export class CartSummary {
    readonly totalProducts: number;
    readonly orders: OrderDto[];
    readonly totalPrice: number;

    constructor(orders: OrderDto[], totalProducts: number, totalPrice: number) {
        this.orders = orders;
        this.totalProducts = totalProducts;
        this.totalPrice = totalPrice;
    }
}
