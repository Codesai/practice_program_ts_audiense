import {PriceId} from "./PriceId";

export class Price {
    private readonly priceId: PriceId;
    private readonly amount: number;

    constructor(priceId: PriceId, number: number) {
        this.priceId = priceId;
        this.amount = number;
    }

    idAsString(): string {
        return this.priceId.value();
    }

    value(): number {
        return this.amount;
    }
}
