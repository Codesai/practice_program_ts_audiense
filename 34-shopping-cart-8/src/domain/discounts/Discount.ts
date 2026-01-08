import {DiscountDto} from "./DiscountDto";

export interface Discount {
    applyTo(amount: number): number;

    toDto(): DiscountDto;
}
