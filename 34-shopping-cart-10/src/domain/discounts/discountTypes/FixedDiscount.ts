import {Discount} from "../Discount";
import {DiscountCode} from "../DiscountCode";
import {DiscountDto} from "../DiscountDto";

export class FixedDiscount implements Discount {
    private readonly value: number;
    private readonly code: DiscountCode;

    constructor(value: number, code: DiscountCode) {
        this.code = code;
        this.value = Math.max(value, 0);
    }

    applyTo(amount: number): number {
        return Math.max(0, amount - this.value);
    }

    toDto(): DiscountDto {
        return DiscountDto.fixed(this.code, this.value);
    }
}
