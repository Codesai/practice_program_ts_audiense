import {Discount} from '../../../src/domain/discounts/Discount';
import {when} from "jest-when";
import {
    DependingOnMinimumAmountDiscount
} from "../../../src/domain/discounts/discountTypes/DependingOnMinimumAmountDiscount";

const amountAfterApplyingDiscount = 10;
describe('DependingOnMinimumAmountDiscount', () => {
    let discount: jest.Mocked<Discount>;

    beforeEach(() => {
        discount = {
            applyTo: jest.fn(),
            toDto: jest.fn()
        };
    });

    it.each([
        [100],
        [100.01],
        [150]
    ])('should apply discount when amount (%i) is greater than or equal to minimum amount', (amount) => {
        const conditionalDiscount = aDiscountAppliedWhenOverMinimumAmount(discount, 100);
        when(discount.applyTo).calledWith(amount).mockReturnValue(amountAfterApplyingDiscount);

        const result = conditionalDiscount.applyTo(amount);

        expect(result).toBe(amountAfterApplyingDiscount);
    });

    it('should not apply discount when amount is less than minimum amount', () => {
        const amount = 99.99;
        const conditionalDiscount = aDiscountAppliedWhenOverMinimumAmount(discount, 100);
        when(discount.applyTo).calledWith(amount).mockReturnValue(amountAfterApplyingDiscount);

        const result = conditionalDiscount.applyTo(amount);

        expect(result).toBe(amount);
    });

    function aDiscountAppliedWhenOverMinimumAmount(discount: Discount, minimumRequiredAmount: number): DependingOnMinimumAmountDiscount {
        return new DependingOnMinimumAmountDiscount(discount, minimumRequiredAmount);
    }
});