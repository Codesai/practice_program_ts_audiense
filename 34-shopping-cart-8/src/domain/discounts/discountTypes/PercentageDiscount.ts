import {Discount} from "../Discount";
import {Percentage} from "../../orders/Percentage";
import {DiscountCode} from "../DiscountCode";
import {DiscountDto} from "../DiscountDto";

export class PercentageDiscount implements Discount {

    private readonly percentage: Percentage;
    private readonly code: DiscountCode;

    constructor(percentage: Percentage, code: DiscountCode) {
        this.percentage = percentage;
        this.code = code;
    }

    applyTo(amount: number): number {
        return amount - this.percentage.calculateFor(amount);
    }

    toDto(): DiscountDto {
        return DiscountDto.percentage(this.code, this.percentage.value());
    }
}
