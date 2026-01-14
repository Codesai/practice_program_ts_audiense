import {Discount} from "../../src/domain/discounts/Discount";
import {aPercentageOf} from "./PercentageFactory";
import {DiscountCode} from "../../src/domain/discounts/DiscountCode";
import {PercentageDiscount} from "../../src/domain/discounts/discountTypes/PercentageDiscount";
import {FixedDiscount} from "../../src/domain/discounts/discountTypes/FixedDiscount";
import {aDiscountCode} from "./DiscountCodeFactory";
import {
    AppliedOverMinimumTotalPriceDiscount
} from "../../src/domain/discounts/discountTypes/AppliedOverMinimumTotalPriceDiscount";
import {DiscountTypeDTO} from "../../src/domain/discounts/DiscountTypeDTO";

export function aPercentageDiscount(): DiscountBuilder {
    return new DiscountBuilder(DiscountTypeDTO.PERCENTAGE);
}

export function aFixedDiscount(): DiscountBuilder {
    return new DiscountBuilder(DiscountTypeDTO.FIXED);
}

export function apply(discountBuilder: DiscountBuilder): AppliedOverMinimumTotalPriceDiscountBuilder {
    return new AppliedOverMinimumTotalPriceDiscountBuilder(discountBuilder);
}

class DiscountBuilder {
    private value: number;
    private code: DiscountCode;
    private readonly discountType: DiscountTypeDTO;

    constructor(discountType: DiscountTypeDTO) {
        this.discountType = discountType;
        this.value = 0;
        this.code = aDiscountCode("");
    }

    build(): Discount {
        if (this.discountType === DiscountTypeDTO.PERCENTAGE) {
            return new PercentageDiscount(aPercentageOf(this.value), this.code);
        }

        if (this.discountType === DiscountTypeDTO.FIXED) {
            return new FixedDiscount(
                this.value,
                this.code
            )
        }

        throw new Error("Unknown discount type");
    }

    of(percentage: number): this {
        this.value = percentage;
        return this;
    }

    withCode(code: string): this {
        this.code = aDiscountCode(code);
        return this;
    }
}

class AppliedOverMinimumTotalPriceDiscountBuilder {
    private minimumPrice: number;
    private readonly discountBuilder: DiscountBuilder;

    constructor(discountBuilder: DiscountBuilder) {
        this.discountBuilder = discountBuilder;
    }

    build(): Discount {
        return new AppliedOverMinimumTotalPriceDiscount(this.discountBuilder.build(), this.minimumPrice);
    }

    whenTotalPriceIsEqualOrGreaterThan(minimumPrice: number): this {
        this.minimumPrice = minimumPrice;
        return this;
    }
}
