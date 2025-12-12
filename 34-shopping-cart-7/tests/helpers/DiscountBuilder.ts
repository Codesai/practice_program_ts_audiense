import {Discount} from "../../src/domain/Discount";
import {aPercentageOf} from "./PercentageFactory";
import {DiscountCode} from "../../src/domain/DiscountCode";

export function aDiscount(): DiscountBuilder {
    return new DiscountBuilder();
}

export function aDiscountCode(code: string): DiscountCode {
    return new DiscountCode(code);
}

class DiscountBuilder {
    private percentage: number;
    private code: DiscountCode;

    constructor() {
        this.percentage = 0;
    }

    ofPercentage(percentage: number): DiscountBuilder {
        this.percentage = percentage;
        return this;
    }

    with(code: DiscountCode): DiscountBuilder {
        this.code = code;
        return this;
    }

    build(): Discount {
        return new Discount(aPercentageOf(this.percentage), this.code);
    }
}