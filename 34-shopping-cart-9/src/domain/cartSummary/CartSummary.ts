import {OrderDto} from "./OrderDto";
import {DiscountDto} from "../discounts/DiscountDto";

export class CartSummary {
    readonly totalProducts: number;
    readonly orders: OrderDto[];
    readonly totalPrice: number;

    readonly discount: DiscountDto;

    constructor(orders: OrderDto[], totalProducts: number, totalPrice: number, discount: DiscountDto) {
        this.orders = orders;
        this.totalProducts = totalProducts;
        this.totalPrice = totalPrice;

        this.discount = discount;
    }
}
