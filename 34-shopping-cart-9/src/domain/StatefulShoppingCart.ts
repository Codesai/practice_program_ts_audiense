import {SummaryView} from "./SummaryView";
import {CartSummary} from "./cartSummary/CartSummary";
import {ProductsRepository} from "./ProductsRepository";
import {Orders} from "./orders/Orders";
import {DiscountsRepository} from "./DiscountsRepository";
import {ShoppingCart} from "./ShoppingCart";

export class StatefulShoppingCart implements ShoppingCart {
    private readonly summaryView: SummaryView;
    private readonly availableProductsRepository: ProductsRepository;
    private readonly availableDiscountsRepository: DiscountsRepository;
    private readonly orders: Orders;

    constructor(summaryView: SummaryView, availableProductsRepository: ProductsRepository, availableDiscountsRepository: DiscountsRepository) {
        this.summaryView = summaryView;
        this.availableProductsRepository = availableProductsRepository;
        this.availableDiscountsRepository = availableDiscountsRepository;
        this.orders = new Orders();
    }

    display(): void {
        this.summaryView.show(this.generateCartSummary());
    }

    orderProductWith(productName: string): void {
        const product = this.availableProductsRepository.findProductWith(productName);
        this.orders.order(product);
    }

    applyDiscount(discountCode: string): void {
        const discount = this.availableDiscountsRepository.findDiscountWith(discountCode);
        this.orders.applyDiscount(discount);
    }

    private generateCartSummary(): CartSummary {
        return this.orders.generateCartSummary();
    }
}
