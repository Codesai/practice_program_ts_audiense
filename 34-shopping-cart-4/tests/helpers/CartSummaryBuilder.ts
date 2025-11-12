import {CartSummary} from "../../src/CartSummary";
import {OrderDto} from "../../src/OrderDto";
import {OrderDtoBuilder} from "./OrderDtoBuilder";
import {Discount} from "../../src/Discount";

export function aCartContaining(...orderBuilders: OrderDtoBuilder[]): CartSummaryBuilder {
    return new CartSummaryBuilder(orderBuilders);
}

export function anEmptyCart(): CartSummaryBuilder {
    return aCartContaining();
}

class CartSummaryBuilder {
    private readonly orders: OrderDto[];
    private totalProducts: number;
    private totalPrice: number;
    private discountCode: string;

    constructor(orderBuilders: OrderDtoBuilder[]) {
        this.orders = orderBuilders.map(orderBuilder => orderBuilder.build());
        this.totalProducts = 0;
        this.totalPrice = 0;
        this.discountCode = Discount.noDiscount().codeAsString();
    }

    withTotalProducts(totalProducts: number): CartSummaryBuilder {
        this.totalProducts = totalProducts;
        return this;
    }

    withTotalPrice(totalPrice: number): CartSummaryBuilder {
        this.totalPrice = totalPrice;
        return this;
    }

    withDiscountCode(discountCode: string): CartSummaryBuilder {
        this.discountCode = discountCode;
        return this;
    }

    build(): CartSummary {
        return new CartSummary(this.orders, this.totalProducts, this.totalPrice, this.discountCode);
    }
}
