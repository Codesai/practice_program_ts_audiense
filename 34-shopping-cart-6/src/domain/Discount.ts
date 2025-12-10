import {Percentage} from "./Percentage";
import {DiscountCode} from "./DiscountCode";
import {DiscountDto} from "./DiscountDto";

export class Discount {
    private readonly percentage: Percentage;
    private readonly code: DiscountCode;

    constructor(percentage: Percentage, code: DiscountCode) {
        this.percentage = percentage;
        this.code = code;
    }

    static noDiscount(): Discount {
        return new Discount(
            new Percentage(0),
            DiscountCode.noDiscount()
        );
    }

    applyTo(amount: number): number {
        return this.percentage.calculateFor(amount);
    }

    toDto(): DiscountDto {
        return new DiscountDto(this.code, this.percentage.value());
    }
}


