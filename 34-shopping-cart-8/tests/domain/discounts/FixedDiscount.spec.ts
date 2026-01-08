import {behavesLikeDiscount} from "./behavesLikeDiscount";
import {aFixedDiscount} from "../../helpers/DiscountBuilder";

describe('FixedDiscount',
    behavesLikeDiscount({
        validDiscount: {
            discount: aFixedDiscount().of(5).withDiscountCode('POSITIVE').build(),
            amount: 100,
            expectedAmount: 95
        },
        tooMuch: {
            discount: aFixedDiscount().of(5).withDiscountCode('TOO_MUCH_DISCOUNT').build(),
            amount: 4.9
        },
        negativeDiscount: {
            discount: aFixedDiscount().of(-5).withDiscountCode('NEGATIVE').build()
        }
    })
);

