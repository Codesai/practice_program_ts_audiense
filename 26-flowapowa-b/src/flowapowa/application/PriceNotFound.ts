import {ElementId} from "./ElementId";

export class PriceNotFound extends Error {

    constructor(elementId: ElementId) {
        super(elementId.asString());
    }
}
