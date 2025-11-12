import {Discount} from "./Discount";

export class Price {
    private readonly _value: number;

    constructor(value: number) {
        this._value = Price.roundUp(value);
    }

    static of(value: number): Price {
        return new Price(value);
    }

    private static roundUp(value: number): number {
        const valueWithTwoFraction = Number((value * 100).toFixed(2));
        return Math.ceil(valueWithTwoFraction) / 100;
    }

    value(): number {
        return this._value;
    }

    applyDiscount(discount: Discount): Price {
        return Price.of(this.value() - discount.applyTo(this.value()));
    }
}