import {Price} from "../Price";
import {ElementId} from "../ElementId";

export interface Pricer {
    setPrice(elementId: ElementId, price: Price): void;
}