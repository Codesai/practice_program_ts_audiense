import {behavesLikeDiscount} from "./behavesLikeDiscount";
import {aNoDiscountDto} from "../../helpers/DiscountDtoBuilder";
import {Discount} from "../../../src/domain/discounts/Discount";
import {NoDiscount} from "../../../src/domain/discounts/discountTypes/NoDiscount";

describe('NoDiscount',
    behavesLikeDiscount({
        validDiscount: {
            discount: noDiscount(),
            amount: 100,
            expectedAmount: 100
        },
        tooMuch: {
            discount: noDiscount(),
            amount: 4.9
        },
        negativeDiscount: {
            discount: noDiscount()
        },
        toDto: {
            discount: noDiscount(),
            expectedDto: aNoDiscountDto().build()
        }
    })
);

function noDiscount(): Discount {
    return new NoDiscount();
}
