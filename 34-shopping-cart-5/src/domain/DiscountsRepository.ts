import {Discount} from "./Discount";

export interface DiscountsRepository {
    findDiscountWith(discountCode: string): Discount;
}