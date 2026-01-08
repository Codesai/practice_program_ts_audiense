import {SummaryView} from "../domain/SummaryView";
import {CartSummary} from "../domain/cartSummary/CartSummary";
import {Display} from "./Display";
import {OrderDto} from "../domain/cartSummary/OrderDto";
import {CartSummaryError} from "../domain/cartSummary/CartSummaryError";
import {DiscountCode} from "../domain/discounts/DiscountCode";
import {DiscountDto, DiscountTypeDTO} from "../domain/discounts/DiscountDto";
import {ErrorType} from "../domain/cartSummary/ErrorType";

export class ConsoleSummaryView implements SummaryView {
    private static readonly LINE_BREAK = "\n";
    private readonly display: Display;

    constructor(display: Display) {
        this.display = display;
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
        return this.headerText() + this.ordersText(content) + this.footerText(content);
    }

    private static headerText(): string {
        return "Product Name, Price with VAT, Quantity" + this.LINE_BREAK;
    }

    private static ordersText(content: CartSummary): string {
        return content.orders.reduce(
            (acc, order) => {
                return acc + this.formatOrder(order) + this.LINE_BREAK;
            },
            "",
        );
    }

    private static footerText(content: CartSummary): string {
        let summaryText = "";
        if (this.isNoDiscount(content.discount)) {
            summaryText += this.formatPromotion(content) + this.LINE_BREAK;
        }
        summaryText += this.formatTotalProducts(content) + this.LINE_BREAK;
        summaryText += this.formatTotalPrice(content)
        return summaryText;
    }

    private static isNoDiscount(discount: DiscountDto): boolean {
        return discount.code.text !== DiscountCode.noDiscount().text;
    }

    private static formatPromotion(content: CartSummary): string {
        const symbol = content.discount.type === DiscountTypeDTO.PERCENTAGE ? '%' : '€';
        return `Promotion: ${content.discount.value}${symbol} off with code ${content.discount.code.text}`;
    }

    private static formatTotalPrice(content: CartSummary): string {
        return "Total Price: " + `${this.formatPrice(content.totalPrice)}`;
    }

    private static formatTotalProducts(content: CartSummary): string {
        return "Total Products: " + `${content.totalProducts}`;
    }

    private static formatOrder(order: OrderDto): string {
        return `${order.productName}, ${this.formatPrice(order.priceWithVat)}, ${order.quantity}`;
    }

    private static formatPrice(price: number): string {
        return price.toFixed(2);
    }

    show(content: CartSummary): void {
        this.display.show(ConsoleSummaryView.displayedText(content));
    }

    error(error: CartSummaryError): void {
        if (error.errorType === ErrorType.NOT_FOUND_DISCOUNT) {
            this.display.show(`The discount ${error.info} does not exist.`);
        } else if (error.errorType === ErrorType.NOT_FOUND_PRODUCT) {
            this.display.show(`The product ${error.info} is not available.`);
        } else {
            this.display.show(`unknown error: ${error.info}`);
        }
    }
}
