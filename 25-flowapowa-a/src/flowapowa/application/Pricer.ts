import {Element} from "./Recipe";

export interface Pricer {
    set(element: Element, price: number): void
}