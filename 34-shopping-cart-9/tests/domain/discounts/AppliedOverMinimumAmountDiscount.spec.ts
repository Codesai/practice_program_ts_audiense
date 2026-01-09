import {Discount} from '../../../src/domain/discounts/Discount';
import {when} from "jest-when";
import {
    AppliedOverMinimumAmountDiscount
} from "../../../src/domain/discounts/discountTypes/AppliedOverMinimumAmountDiscount";
import {aFixedDiscountDTO} from "../../helpers/DiscountDtoBuilder";

describe('AppliedOverMinimumAmountDiscount', () => {
    const minimumRequiredAmount: number = 100.00;
    let proxiedDiscount: jest.Mocked<Discount>;
    let conditionalDiscount: Discount;

    beforeEach(() => {
        proxiedDiscount = {
            applyTo: jest.fn(),
            toDto: jest.fn()
        };
        conditionalDiscount = aDiscountAppliedWhenOverMinimumAmount(proxiedDiscount, minimumRequiredAmount);
    });

    it.each([
        [minimumRequiredAmount, minimumRequiredAmount],
        [100.01, minimumRequiredAmount],
        [150.00, minimumRequiredAmount]
    ])('should apply discount when amount (%f) greater than or equal to minimum required amount (%f)',
        (amount: number, _: number) => {
            const amountApplyingDiscount = 10;
            when(proxiedDiscount.applyTo).calledWith(amount).mockReturnValue(amountApplyingDiscount);

            const finalAmount = conditionalDiscount.applyTo(amount);

            expect(finalAmount).toBe(amountApplyingDiscount);
        });

    it('should not apply discount when amount is less than the minimum required amount', () => {
        const amount = 99.99;

        const finalAmount = conditionalDiscount.applyTo(amount);

        expect(finalAmount).toBe(amount);
    });

    it('should create its DTO correctly', () => {
        const proxiedDiscountDto = aFixedDiscountDTO().build();
        when(proxiedDiscount.toDto).mockReturnValue(proxiedDiscountDto);

        const discountDto = conditionalDiscount.toDto();

        expect(discountDto).toStrictEqual(proxiedDiscountDto);
    });

    function aDiscountAppliedWhenOverMinimumAmount(discount: Discount, minimumRequiredAmount: number): AppliedOverMinimumAmountDiscount {
        return new AppliedOverMinimumAmountDiscount(discount, minimumRequiredAmount);
    }
});

// See an alternative version not using test doubles in https://gist.github.com/trikitrok/f623d5054a6171b0a2a8e13a1f8f438c