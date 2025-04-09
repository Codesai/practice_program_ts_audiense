import {PriceId} from "./PriceId";

export class PriceNotFoundFor extends Error {

    constructor(priceId: PriceId) {
        super(priceId.value());
    }
}
