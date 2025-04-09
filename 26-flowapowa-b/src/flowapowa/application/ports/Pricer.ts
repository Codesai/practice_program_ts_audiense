import {Price} from "../Price";

export interface Pricer {
    setPrice(price: Price): void;
}