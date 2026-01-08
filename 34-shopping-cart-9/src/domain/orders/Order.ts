import {OrderDto} from "../cartSummary/OrderDto";
import {Product} from "../products/Product";

export class Order {
    private readonly quantity: number;
    private readonly product: Product;

    private constructor(product: Product, quantity: number = 1) {
        this.quantity = quantity;
        this.product = product;
    }

    static of(product: Product): Order {
        return new Order(product, 1);
    }

    addProduct(): Order {
        return new Order(this.product, this.quantity + 1);
    }

    toDto(): OrderDto {
        return new OrderDto(this.product.getName(), this.quantity, this.product.finalPrice().value());
    }

    price(): number {
        return this.product.finalPrice().value() * this.quantity;
    }

    numberOfProducts(): number {
        return this.quantity;
    }
}
