import {Discount} from "../Discount";
import {DiscountDto} from "../DiscountDto";
import {DiscountCode} from "../DiscountCode";
import {FixedDiscount} from "./FixedDiscount";

export class NoDiscount implements Discount {
    private zeroDiscount: FixedDiscount;

    constructor() {
        this.zeroDiscount = new FixedDiscount(0, DiscountCode.noDiscount());
    }

    applyTo(amount: number): number {
        return this.zeroDiscount.applyTo(amount);
    }

    toDto(): DiscountDto {
        return this.zeroDiscount.toDto();
    }
}
