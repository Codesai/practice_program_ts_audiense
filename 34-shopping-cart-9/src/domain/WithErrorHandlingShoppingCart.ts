import {ShoppingCart} from "./ShoppingCart";
import {SummaryView} from "./SummaryView";
import {CartSummaryError} from "./cartSummary/CartSummaryError";
import {ErrorType} from "./cartSummary/ErrorType";

export class WithErrorHandlingShoppingCart implements ShoppingCart {
    private readonly shoppingCart: ShoppingCart;
    private readonly summaryView: SummaryView;

    constructor(shoppingCart: ShoppingCart, summaryView: SummaryView) {
        this.shoppingCart = shoppingCart;
        this.summaryView = summaryView;
    }

    applyDiscount(discountCode: string): void {
        try {
            this.shoppingCart.applyDiscount(discountCode);
        } catch (error) {
            this.summaryView.error(this.notFoundDiscountError(discountCode));
        }
    }

    display(): void {
        this.shoppingCart.display();
    }

    orderProductWith(productName: string): void {
        try {
            this.shoppingCart.orderProductWith(productName);
        } catch (error) {
            this.summaryView.error(this.notFoundProductError(productName));
        }
    }

    private notFoundProductError(productName: string) {
        return new CartSummaryError(ErrorType.NOT_FOUND_PRODUCT, productName);
    }

    private notFoundDiscountError(discountCode: string) {
        return new CartSummaryError(ErrorType.NOT_FOUND_DISCOUNT, discountCode);
    }
}