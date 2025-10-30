import {CartSummary} from "../src/CartSummary";
import {OrderDto} from "../src/OrderDto";
import {OrderBuilder} from "./OrderBuilder";

export function aCartContaining(...orderBuilders: OrderBuilder[]): CartContentBuilder {
    return new CartContentBuilder(orderBuilders);
}

export function anEmptyCart(): CartContentBuilder {
    return aCartContaining();
}

class CartContentBuilder {
    private readonly orders: OrderDto[];
    private totalProducts: number;
    private totalPrice: number;

    constructor(orderBuilders: OrderBuilder[]) {
        this.orders = orderBuilders.map(orderBuilder => orderBuilder.build());
        this.totalProducts = 0;
        this.totalPrice = 0;
    }

    withTotalProducts(totalProducts: number): CartContentBuilder {
        this.totalProducts = totalProducts;
        return this;
    }

    withTotalPrice(totalPrice: number): CartContentBuilder {
        this.totalPrice = totalPrice;
        return this;
    }

    build(): CartSummary {
        return new CartSummary(this.orders, this.totalProducts, this.totalPrice);
    }
}
