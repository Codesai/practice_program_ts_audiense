import {Order} from "./Order";
import {Product} from "./Product";
import {CartSummary} from "./CartSummary";

export class Orders {
    private readonly orders: Order[];

    constructor() {
        this.orders = [];
    }

    add(product: Product): void {
        this.orders.push(new Order(product.name, product.finalPrice(), 1));
    }

    generateCartSummary(): CartSummary {
        let ordersData = this.orders.map(order => order.toDto());
        return new CartSummary(
            ordersData,
            ordersData.length,
            ordersData[0] != null ? ordersData[0].priceWithVat : 0);
    }
}