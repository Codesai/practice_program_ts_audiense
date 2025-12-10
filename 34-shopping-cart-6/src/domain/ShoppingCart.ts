import {SummaryView} from "./SummaryView";
import {CartSummary} from "./CartSummary";
import {ProductsRepository} from "./ProductsRepository";
import {Orders} from "./Orders";
import {DiscountsRepository} from "./DiscountsRepository";
import {CartSummaryError} from "./CartSummaryError";

export class ShoppingCart {
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
        try {
            const product = this.availableProductsRepository.findProductWith(productName);
            this.orders.order(product);
        } catch (e) {
            this.summaryView.error(new CartSummaryError(`${productName} not found`));
        }
    }

    applyDiscount(discountCode: string): void {
        try {
            const discount = this.availableDiscountsRepository.findDiscountWith(discountCode);
            this.orders.applyDiscount(discount);
        } catch (e) {
            this.summaryView.error(new CartSummaryError(`${discountCode} not found`));
        }
    }

    private generateCartSummary(): CartSummary {
        return this.orders.generateCartSummary();
    }
}
