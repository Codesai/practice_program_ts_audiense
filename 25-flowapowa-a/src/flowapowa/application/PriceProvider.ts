import {Element} from "./Recipe";

export interface PriceProvider {
    getElementPrice(element: Element): number
}