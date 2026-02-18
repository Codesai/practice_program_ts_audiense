import {behavesLikeDiscount} from "./behavesLikeDiscount";
import {aFixedDiscount} from "../../helpers/DiscountBuilder";
import {aFixedDiscountDTO} from "../../helpers/DiscountDtoBuilder";

describe('FixedDiscount',
    behavesLikeDiscount({
        validDiscount: {
            discount: aFixedDiscount().of(5).withCode('POSITIVE').build(),
            amount: 100,
            expectedAmount: 95
        },
        tooMuchDiscount: {
            discount: aFixedDiscount().of(5).withCode('TOO_MUCH_DISCOUNT').build(),
            amount: 4.9
        },
        negativeDiscount: {
            discount: aFixedDiscount().of(-5).withCode('NEGATIVE').build()
        },
        toDto: {
            discount: aFixedDiscount().of(25).withCode('20_OFF').build(),
            expectedDto: aFixedDiscountDTO().withCode('20_OFF').withValue(25).build()
        }
    })
);

