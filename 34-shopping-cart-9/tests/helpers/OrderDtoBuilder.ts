import {OrderDto} from "../../src/domain/cartSummary/OrderDto";

export function anOrder(): OrderDtoBuilder {
    return new OrderDtoBuilder();
}

export class OrderDtoBuilder {
    private productName: string;
    private priceWithVat: number;
    private quantity: number;

    constructor() {
        this.productName = "Default Product";
        this.priceWithVat = 1.00;
        this.quantity = 1;
    }

    build(): OrderDto {
        return new OrderDto(this.productName, this.quantity, this.priceWithVat);
    }

    withProductName(productName: string): this {
        this.productName = productName;
        return this;
    }

    withPriceWithVat(priceWithVat: number): this {
        this.priceWithVat = priceWithVat;
        return this;
    }

    withQuantity(quantity: number): this {
        this.quantity = quantity;
        return this;
    }
}