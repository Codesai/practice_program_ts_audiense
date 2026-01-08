import {CartSummary} from "../../src/domain/cartSummary/CartSummary";
import {OrderDto} from "../../src/domain/cartSummary/OrderDto";
import {OrderDtoBuilder} from "./OrderDtoBuilder";
import {DiscountDto} from "../../src/domain/discounts/DiscountDto";
import {aNoDiscountDto, DiscountDtoBuilder} from "./DiscountDtoBuilder";

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
    private discountDto: DiscountDto;

    constructor(orderBuilders: OrderDtoBuilder[]) {
        this.orders = orderBuilders.map(orderBuilder => orderBuilder.build());
        this.totalProducts = 0;
        this.totalPrice = 0;
        this.discountDto = aNoDiscountDto().build();
    }

    build(): CartSummary {
        return new CartSummary(this.orders, this.totalProducts, this.totalPrice, this.discountDto);
    }

    withTotalProducts(totalProducts: number): this {
        this.totalProducts = totalProducts;
        return this;
    }

    withTotalPrice(totalPrice: number): this {
        this.totalPrice = totalPrice;
        return this;
    }

    withDiscount(discountDtoBuilder: DiscountDtoBuilder): this {
        this.discountDto = discountDtoBuilder.build()
        return this;
    }
}
