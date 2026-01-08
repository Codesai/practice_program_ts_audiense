import {DiscountCode} from "../../src/domain/discounts/DiscountCode";

export function aDiscountCode(code: string): DiscountCode {
    return new DiscountCode(code);
}