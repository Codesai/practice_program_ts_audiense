import {OrderDto} from "./OrderDto";

export class CartSummary {
    readonly totalProducts: number;
    readonly orders: OrderDto[];
    readonly totalPrice: number;
    readonly discountCode: string;

    constructor(orders: OrderDto[], totalProducts: number, totalPrice: number, discountCode: string) {
        this.orders = orders;
        this.totalProducts = totalProducts;
        this.totalPrice = totalPrice;
        this.discountCode = discountCode;
    }
}
