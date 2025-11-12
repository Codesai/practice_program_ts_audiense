import {Order} from "./Order";
import {Product} from "./Product";
import {CartSummary} from "./CartSummary";
import {Discount} from "./Discount";
import {OrderDto} from "./OrderDto";
import {Price} from "./Price";

export class Orders {
    private readonly orders: Order[];
    private discount: Discount;

    constructor() {
        this.orders = [];
        this.discount = Discount.noDiscount();
    }

    add(product: Product): void {
        this.orders.push(new Order(product.name, product.finalPrice().value(), 1));
    }

    generateCartSummary(): CartSummary {
        let ordersData = this.orders.map(order => order.toDto());
        return new CartSummary(ordersData, ordersData.length, this.totalPrice(ordersData).applyDiscount(this.discount).value(), this.discount.codeAsString());
    }

    applyDiscount(discount: Discount): void {
        this.discount = discount;
    }

    private totalPrice(ordersData: OrderDto[]): Price {
        return Price.of(ordersData[0] != null ? ordersData[0].priceWithVat : 0);
    }
}
