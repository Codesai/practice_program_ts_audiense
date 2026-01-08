import {Discount} from "../../src/domain/discounts/Discount";
import {aPercentageOf} from "./PercentageFactory";
import {DiscountCode} from "../../src/domain/discounts/DiscountCode";
import {PercentageDiscount} from "../../src/domain/discounts/discountTypes/PercentageDiscount";
import {FixedDiscount} from "../../src/domain/discounts/discountTypes/FixedDiscount";
import {aDiscountCode} from "./DiscountCodeFactory";

export function aPercentageDiscount(): PercentageDiscountBuilder {
    return new PercentageDiscountBuilder();
}

export function aFixedDiscount(): FixedDiscountBuilder {
    return new FixedDiscountBuilder();
}

class FixedDiscountBuilder {
    private fixedAmount: number;
    private code: DiscountCode;

    constructor() {
        this.fixedAmount = 0;
    }

    build(): Discount {
        return new FixedDiscount(this.fixedAmount, this.code);
    }

    of(fixedAmount: number): FixedDiscountBuilder {
        this.fixedAmount = fixedAmount;
        return this;
    }

    withDiscountCode(code: string): FixedDiscountBuilder {
        this.code = aDiscountCode(code);
        return this;
    }
}

class PercentageDiscountBuilder {
    private percentage: number;
    private code: DiscountCode;

    constructor() {
        this.percentage = 0;
    }

    build(): Discount {
        return new PercentageDiscount(aPercentageOf(this.percentage), this.code);
    }

    of(percentage: number): PercentageDiscountBuilder {
        this.percentage = percentage;
        return this;
    }

    with(code: DiscountCode): PercentageDiscountBuilder {
        this.code = code;
        return this;
    }

    withDiscountCode(code: string): PercentageDiscountBuilder {
        return this.with(aDiscountCode(code));
    }
}
