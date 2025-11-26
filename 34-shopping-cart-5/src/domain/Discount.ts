import {Percentage} from "./Percentage";
import {DiscountCode} from "./DiscountCode";

export class Discount {
    private readonly percentage: Percentage;
    private readonly code: DiscountCode;

    constructor(percentage: Percentage, code: DiscountCode) {
        this.percentage = percentage;
        this.code = code;
    }

    static noDiscount(): Discount {
        return new Discount(new Percentage(0), new DiscountCode("NO_DISCOUNT"));
    }

    codeAsString(): string {
        return this.code.text;
    }

    applyTo(amount: number): number {
        return this.percentage.calculateFor(amount);
    }
}


