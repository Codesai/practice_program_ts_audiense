import {ElementId} from "../ElementId";

export interface PriceProvider {
    getPrice(elementId: ElementId): number;
}