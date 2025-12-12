import {CartSummary} from "../../src/domain/CartSummary";
import {OrderDto} from "../../src/domain/OrderDto";
import {OrderDtoBuilder} from "./OrderDtoBuilder";
import {Discount} from "../../src/domain/Discount";
import {DiscountDto} from "../../src/domain/DiscountDto";
import {DiscountDtoBuilder} from "./DiscountDtoBuilder";

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
    private discount: DiscountDto;

    constructor(orderBuilders: OrderDtoBuilder[]) {
        this.orders = orderBuilders.map(orderBuilder => orderBuilder.build());
        this.totalProducts = 0;
        this.totalPrice = 0;
        this.discount = Discount.noDiscount().toDto();
    }

    withTotalProducts(totalProducts: number): CartSummaryBuilder {
        this.totalProducts = totalProducts;
        return this;
    }

    withTotalPrice(totalPrice: number): CartSummaryBuilder {
        this.totalPrice = totalPrice;
        return this;
    }

    withDiscount(discount: DiscountDtoBuilder): CartSummaryBuilder {
        this.discount = discount.build()
        return this;
    }

    build(): CartSummary {
        return new CartSummary(this.orders, this.totalProducts, this.totalPrice, this.discount);
    }
}
