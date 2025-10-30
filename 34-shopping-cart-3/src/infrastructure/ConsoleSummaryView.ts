import {SummaryView} from "../SummaryView";
import {CartSummary} from "../CartSummary";
import {Display} from "./Display";
import {OrderDto} from "../OrderDto";

export class ConsoleSummaryView implements SummaryView {
    private readonly display: Display;
    private readonly lineSeparator = "\n";

    constructor(display: Display) {
        this.display = display;
    }

    show(content: CartSummary): void {
        if (content.orders.length === 0) {
            this.display.show('Cart is empty');
        } else {
            this.display.show(this.displayedText(content));
        }
    }

    private displayedText(content: CartSummary) {
        const header = this.headerText();
        const productsDetails = this.productsText(content);
        const summary = this.summaryText(content);
        return header + productsDetails + summary;
    }

    private headerText() {
        return "Product Name, Price with VAT, Quantity" + this.lineSeparator;
    }

    private productsText(content: CartSummary) {
        return this.productString(content.orders[0]) + this.lineSeparator;
    }

    private summaryText(content: CartSummary) {
        return "Total Products: " + `${content.totalProducts}` + this.lineSeparator + "Total Price: " + `${this.formatPrice(content.totalPrice)}`;
    }

    private productString(order: OrderDto): string {
        return `${order.productName}, ${this.formatPrice(order.priceWithVat)}, ${order.quantity}`;
    }

    private formatPrice(price: number): string {
        return price.toFixed(2);
    }
}