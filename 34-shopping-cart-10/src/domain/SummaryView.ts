import {CartSummary} from "./cartSummary/CartSummary";
import {CartSummaryError} from "./cartSummary/CartSummaryError";

export interface SummaryView {
    show(content: CartSummary): void;

    error(error: CartSummaryError): void;
}
