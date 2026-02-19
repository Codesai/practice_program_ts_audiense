import {Discount} from "./discounts/Discount";

export interface DiscountsRepository {
    findDiscountWith(discountCode: string): Promise<Discount>;
}

export class DiscountNotFoundException extends Error {
    constructor(message: string) {
        super(message);
    }
}