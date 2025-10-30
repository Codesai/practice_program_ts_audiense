import {SummaryView} from "./SummaryView";
import {CartSummary} from "./CartSummary";
import {AvailableProductsRepository} from "./AvailableProductsRepository";
import {Orders} from "./Orders";

export class ShoppingCart {
    private readonly contentDisplay: SummaryView;
    private readonly availableProductsRepository: AvailableProductsRepository;
    private orders: Orders;

    constructor(contentDisplay: SummaryView, availableProductsRepository: AvailableProductsRepository) {
        this.contentDisplay = contentDisplay;
        this.availableProductsRepository = availableProductsRepository;
        this.orders = new Orders();
    }

    display(): void {
        this.contentDisplay.show(this.generateCartSummary());
    }

    addItem(productName: string): void {
        const product = this.availableProductsRepository.findProductWith(productName);
        this.orders.add(product);
    }

    private generateCartSummary(): CartSummary {
        return this.orders.generateCartSummary();
    }
}
