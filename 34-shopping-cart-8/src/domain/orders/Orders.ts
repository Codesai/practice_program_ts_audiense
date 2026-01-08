import {Order} from "./Order";
import {Product} from "../products/Product";
import {CartSummary} from "../cartSummary/CartSummary";
import {Discount} from "../discounts/Discount";
import {Price} from "./Price";
import {NoDiscount} from "../discounts/discountTypes/NoDiscount";

export class Orders {
    private discount: Discount;
    private ordersMap: Map<string, Order>;

    constructor() {
        this.ordersMap = new Map();
        this.discount = new NoDiscount();
    }

    order(product: Product): void {
        this.ordersMap.set(product.getName(), this.orderFor(product));
    }

    applyDiscount(discount: Discount): void {
        this.discount = discount;
    }

    generateCartSummary(): CartSummary {
        return new CartSummary(
            this.ordersList().map(order => order.toDto()),
            this.numberOfProducts(),
            this.totalPriceWihDiscount(),
            this.discount.toDto()
        );
    }

    private totalPriceWihDiscount(): number {
        return this.totalPrice().applyDiscount(this.discount).value();
    }

    private orderFor(product: Product): Order {
        const existingOrder = this.ordersMap.get(product.getName());
        if (existingOrder) {
            return existingOrder.addProduct();
        } else {
            return Order.of(product);
        }
    }

    private ordersList(): Order[] {
        return Array.from(this.ordersMap.values());
    }

    private numberOfProducts(): number {
        return this.ordersList().reduce((totalPrice: number, order: Order) => {
            return totalPrice + order.numberOfProducts();
        }, 0)
    }

    private totalPrice(): Price {
        return Price.of(
            this.ordersList().reduce((totalPrice: number, order: Order) => {
                return totalPrice + order.price();
            }, 0)
        );
    }
}
