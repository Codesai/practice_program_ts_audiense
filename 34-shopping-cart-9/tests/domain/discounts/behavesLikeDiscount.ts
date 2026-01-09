import {Discount} from "../../../src/domain/discounts/Discount";
import {DiscountDto} from "../../../src/domain/discounts/DiscountDto";

type ContextsForDiscountTests = {
    validDiscount: { discount: Discount, amount: number, expectedAmount: number },
    negativeDiscount: { discount: Discount },
    tooMuchDiscount: { discount: Discount, amount: number },
    toDto: { discount: Discount, expectedDto: DiscountDto }
};

export function behavesLikeDiscount(contexts: ContextsForDiscountTests) {
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
            const {discount, amount} = contexts.tooMuchDiscount;

            const discountedPrice = discount.applyTo(amount)

            expect(discountedPrice).toBeGreaterThanOrEqual(0);
        });

        it('should create its DTO correctly', () => {
            const {discount, expectedDto} = contexts.toDto;

            const dto = discount.toDto();

            expect(dto).toEqual(expectedDto);
        });
    });
}