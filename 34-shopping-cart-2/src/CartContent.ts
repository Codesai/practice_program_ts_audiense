import {Order} from "./Order";

export class CartContent {
    readonly totalProducts: number;
    readonly orders: Order[];
    readonly totalPrice: number;

    constructor(orders: Order[], totalProducts: number, totalPrice: number) {
        this.orders = orders;
        this.totalProducts = totalProducts;
        this.totalPrice = totalPrice;
    }
}
