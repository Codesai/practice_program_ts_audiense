import {Discount} from "../../../src/domain/discounts/Discount";

type DiscountTestsContexts = {
    validDiscount: { discount: Discount, amount: number, expectedAmount: number },
    negativeDiscount: { discount: Discount },
    tooMuch: { discount: Discount, amount: number }
};

export function behavesLikeDiscount(contexts: DiscountTestsContexts) {
    return () => describe('behaves like a Discount', () => {
        it('should decrease the amount of the price', () => {
            const {discount, amount, expectedAmount} = contexts.validDiscount;

            const discountedPrice = discount.applyTo(amount);

            expect(discountedPrice).toBe(expectedAmount);
        });

        it('should not increase the amount', () => {
            const {discount} = contexts.negativeDiscount;

            const discountedPrice = discount.applyTo(500);

            expect(discountedPrice).toBe(500);
        });

        it('should not lead to a negative amount', () => {
            const {discount, amount} = contexts.tooMuch;

            const discountedPrice = discount.applyTo(amount)

            expect(discountedPrice).toBeGreaterThanOrEqual(0);
        });
    });
}