import {Discount} from '../../../src/domain/discounts/Discount';
import {when} from "jest-when";
import {
    DependingOnMinimumAmountDiscount
} from "../../../src/domain/discounts/discountTypes/DependingOnMinimumAmountDiscount";
import {aFixedDiscountDTO} from "../../helpers/DiscountDtoBuilder";

describe('DependingOnMinimumAmountDiscount', () => {
    const minimumRequiredAmount = 100;
    let decoratedDiscount: jest.Mocked<Discount>;
    let conditionalDiscount: Discount;

    beforeEach(() => {
        decoratedDiscount = {
            applyTo: jest.fn(),
            toDto: jest.fn()
        };
        conditionalDiscount = aDiscountAppliedWhenOverMinimumAmount(decoratedDiscount, minimumRequiredAmount);
    });

    it.each([
        [minimumRequiredAmount],
        [100.01],
        [150]
    ])('should apply discount when amount (%i) is greater than or equal to the minimum required amount', (amount: number) => {
        const amountAfterDecoratedDiscount = 10;
        when(decoratedDiscount.applyTo).calledWith(amount).mockReturnValue(amountAfterDecoratedDiscount);

        const finalAmount = conditionalDiscount.applyTo(amount);

        expect(finalAmount).toBe(amountAfterDecoratedDiscount);
    });

    it('should not apply discount when amount is less than the minimum required amount', () => {
        const amount = 99.99;

        const finalAmount = conditionalDiscount.applyTo(amount);

        expect(finalAmount).toBe(amount);
    });

    it('should create its DTO correctly', () => {
        const decoratedDiscountDto = aFixedDiscountDTO().build();
        when(decoratedDiscount.toDto).mockReturnValue(decoratedDiscountDto);

        const discountDto = conditionalDiscount.toDto();

        expect(discountDto).toStrictEqual(decoratedDiscountDto);
    });

    function aDiscountAppliedWhenOverMinimumAmount(discount: Discount, minimumRequiredAmount: number): DependingOnMinimumAmountDiscount {
        return new DependingOnMinimumAmountDiscount(discount, minimumRequiredAmount);
    }
});

// See an alternative version not using test doubles in https://gist.github.com/trikitrok/f623d5054a6171b0a2a8e13a1f8f438c