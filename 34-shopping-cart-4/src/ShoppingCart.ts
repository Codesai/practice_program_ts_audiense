import {SummaryView} from "./SummaryView";
import {CartSummary} from "./CartSummary";
import {ProductsRepository} from "./ProductsRepository";
import {Orders} from "./Orders";
import {DiscountsRepository} from "./DiscountsRepository";

export class ShoppingCart {
    private readonly contentDisplay: SummaryView;
    private readonly availableProductsRepository: ProductsRepository;
    private readonly availableDiscountsRepository: DiscountsRepository;
    private readonly orders: Orders;

    constructor(contentDisplay: SummaryView, availableProductsRepository: ProductsRepository, availableDiscountsRepository: DiscountsRepository) {
        this.contentDisplay = contentDisplay;
        this.availableProductsRepository = availableProductsRepository;
        this.availableDiscountsRepository = availableDiscountsRepository;
        this.orders = new Orders();
    }

    display(): void {
        this.contentDisplay.show(this.generateCartSummary());
    }

    addItem(productName: string): void {
        const product = this.availableProductsRepository.findProductWith(productName);
        this.orders.add(product);
    }

    applyDiscount(discountCode: string): void {
        const discount = this.availableDiscountsRepository.findDiscountWith(discountCode);
        this.orders.applyDiscount(discount);
    }

    private generateCartSummary(): CartSummary {
        return this.orders.generateCartSummary();
    }
}
