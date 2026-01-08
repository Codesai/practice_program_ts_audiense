import {CartSummary} from "../../src/domain/cartSummary/CartSummary";
import {OrderDto} from "../../src/domain/cartSummary/OrderDto";
import {OrderDtoBuilder} from "./OrderDtoBuilder";
import {DiscountDto} from "../../src/domain/discounts/DiscountDto";
import {DiscountDtoBuilder} from "./DiscountDtoBuilder";
import {NoDiscount} from "../../src/domain/discounts/discountTypes/NoDiscount";

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
        this.discount = new NoDiscount().toDto();
    }

    build(): CartSummary {
        return new CartSummary(this.orders, this.totalProducts, this.totalPrice, this.discount);
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
}
