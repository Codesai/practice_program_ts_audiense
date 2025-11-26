import {CartSummary} from "./CartSummary";
import {CartSummaryError} from "./CartSummaryError";

export interface SummaryView {
    show(content: CartSummary): void;

    error(error: CartSummaryError): void;
}
