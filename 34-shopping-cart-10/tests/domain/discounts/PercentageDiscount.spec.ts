import {behavesLikeDiscount} from "./behavesLikeDiscount";
import {aPercentageDiscount} from "../../helpers/DiscountBuilder";
import {aPercentageDiscountDTO} from "../../helpers/DiscountDtoBuilder";

describe('PercentageDiscount',
    behavesLikeDiscount({
        validDiscount: {
            discount: aPercentageDiscount().of(5).withCode('VALID_DISCOUNT').build(),
            amount: 100,
            expectedAmount: 95
        },
        tooMuchDiscount: {
            discount: aPercentageDiscount().of(110).withCode('TOO_MUCH_DISCOUNT').build(),
            amount: 100
        },
        negativeDiscount: {
            discount: aPercentageDiscount().of(-5).withCode('NEGATIVE').build()
        },
        toDto: {
            discount: aPercentageDiscount().of(25).withCode('25%').build(),
            expectedDto: aPercentageDiscountDTO().withCode('25%').withValue(25).build()
        }
    })
);

