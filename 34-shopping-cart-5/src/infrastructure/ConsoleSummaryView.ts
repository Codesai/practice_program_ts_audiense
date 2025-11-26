import {SummaryView} from "../domain/SummaryView";
import {CartSummary} from "../domain/CartSummary";
import {Display} from "./Display";
import {OrderDto} from "../domain/OrderDto";
import {CartSummaryError} from "../domain/CartSummaryError";

export class ConsoleSummaryView implements SummaryView {
    private readonly display: Display;
    private static readonly LINE_BREAK = "\n";

    constructor(display: Display) {
        this.display = display;
    }

    show(content: CartSummary): void {
        this.display.show(ConsoleSummaryView.displayedText(content));
    }

    error(error: CartSummaryError): void {
    }

    private static displayedText(content: CartSummary): string {
        if (content.orders.length === 0) {
            return this.emptyCartSummaryText();
        } else {
            return this.cartSummaryText(content);
        }
    }

    private static emptyCartSummaryText(): string {
        return 'Cart is empty';
    }

    private static cartSummaryText(content: CartSummary): string {
        return this.headerText() + this.productsText(content) + this.footerText(content);
    }

    private static headerText(): string {
        return "Product Name, Price with VAT, Quantity" + this.LINE_BREAK;
    }

    private static productsText(content: CartSummary): string {
        return this.productString(content.orders[0]) + this.LINE_BREAK;
    }

    private static footerText(content: CartSummary): string {
        return "Total Products: " + `${content.totalProducts}` + this.LINE_BREAK + "Total Price: " + `${this.formatPrice(content.totalPrice)}`;
    }

    private static productString(order: OrderDto): string {
        return `${order.productName}, ${this.formatPrice(order.priceWithVat)}, ${order.quantity}`;
    }

    private static formatPrice(price: number): string {
        return price.toFixed(2);
    }
}