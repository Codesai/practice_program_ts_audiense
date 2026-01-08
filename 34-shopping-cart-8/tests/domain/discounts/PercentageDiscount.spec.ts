import {behavesLikeDiscount} from "./behavesLikeDiscount";
import {aPercentageDiscount} from "../../helpers/DiscountBuilder";

describe('PercentageDiscount',
    behavesLikeDiscount({
        validDiscount: {
            discount: aPercentageDiscount().of(5).withDiscountCode('VALID_DISCOUNT').build(),
            amount: 100,
            expectedAmount: 95
        },
        tooMuch: {
            discount: aPercentageDiscount().of(110).withDiscountCode('TOO_MUCH_DISCOUNT').build(),
            amount: 100
        },
        negativeDiscount: {
            discount: aPercentageDiscount().of(-5).withDiscountCode('NEGATIVE').build()
        }
    })
);

