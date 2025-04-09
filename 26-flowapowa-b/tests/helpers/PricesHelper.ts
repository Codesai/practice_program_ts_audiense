import {PriceId} from "../../src/flowapowa/application/PriceId";
import {Price} from "../../src/flowapowa/application/Price";

export function aPrice(): PriceBuilder {
    return new PriceBuilder();
}

export function priceIdFor(name: string): PriceId {
    return new PriceId(name);
}

class PriceBuilder {
    private priceId: PriceId | null = null;
    private amount: number | null = null;

    forElement(name: string): this {
        this.priceId = priceIdFor(name);
        return this;
    }

    withValue(amount: number): this {
        this.amount = amount;
        return this;
    }

    build(): Price {
        if (this.priceId === null) {
            throw new Error("PriceId must be defined");
        }
        if (this.amount === null) {
            throw new Error("Amount must be defined");
        }
        return new Price(this.priceId, this.amount);
    }
}