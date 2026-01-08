import {behavesLikeDiscount} from "./behavesLikeDiscount";
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
        }
    })
);

function noDiscount() {
    return new NoDiscount();
}
