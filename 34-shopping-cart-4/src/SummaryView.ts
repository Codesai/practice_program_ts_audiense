import {CartSummary} from "./CartSummary";

export interface SummaryView {
    show(content: CartSummary): void;
}
