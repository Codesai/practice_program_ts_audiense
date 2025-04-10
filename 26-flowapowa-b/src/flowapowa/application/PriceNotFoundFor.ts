import {ElementId} from "./ElementId";

export class PriceNotFoundFor extends Error {

    constructor(elementId: ElementId) {
        super(elementId.asString());
    }
}
