import {OrderDto} from "../../src/domain/OrderDto";

export function anOrder(): OrderDtoBuilder {
    return new OrderDtoBuilder();
}

export class OrderDtoBuilder {
    private productName: string = "Default Product";
    private priceWithVat: number = 1.00;
    private quantity: number = 1;

    withProductName(productName: string): OrderDtoBuilder {
        this.productName = productName;
        return this;
    }

    withPriceWithVat(priceWithVat: number): OrderDtoBuilder {
        this.priceWithVat = priceWithVat;
        return this;
    }

    withQuantity(quantity: number): OrderDtoBuilder {
        this.quantity = quantity;
        return this;
    }

    build(): OrderDto {
        return new OrderDto(this.productName, this.quantity, this.priceWithVat);
    }
}
