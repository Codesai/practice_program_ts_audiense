import {OrderDto} from "../src/OrderDto";

export function anOrder(): OrderBuilder {
    return new OrderBuilder();
}

export class OrderBuilder {
    private productName: string = "Default Product";
    private priceWithVat: number = 1.00;
    private quantity: number = 1;

    withProductName(productName: string): OrderBuilder {
        this.productName = productName;
        return this;
    }

    withPriceWithVat(priceWithVat: number): OrderBuilder {
        this.priceWithVat = priceWithVat;
        return this;
    }

    withQuantity(quantity: number): OrderBuilder {
        this.quantity = quantity;
        return this;
    }

    build(): OrderDto {
        return new OrderDto(this.productName, this.priceWithVat, this.quantity);
    }
}
