import {Discount} from "./discounts/Discount";

export interface DiscountsRepository {
    findDiscountWith(discountCode: string): Promise<Discount>;
}