import {Discount} from '../../../src/domain/discounts/Discount';
import {when} from "jest-when";
import {
    DependingOnMinimumAmountDiscount
} from "../../../src/domain/discounts/discountTypes/DependingOnMinimumAmountDiscount";
import {aFixedDiscountDTO} from "../../helpers/DiscountDtoBuilder";

describe('DependingOnMinimumAmountDiscount', () => {
    const amountAfterApplyingDiscount = 10;
    const minimumRequiredAmount = 100;

    let decoratedDiscount: jest.Mocked<Discount>;

    beforeEach(() => {
        decoratedDiscount = {
            applyTo: jest.fn(),
            toDto: jest.fn()
        };
    });

    it.each([
        [minimumRequiredAmount],
        [100.01],
        [150]
    ])('should apply discount when amount (%i) is greater than or equal to minimum amount', (amount: any) => {
        const conditionalDiscount = aDiscountAppliedWhenOverMinimumAmount(decoratedDiscount, minimumRequiredAmount);
        when(decoratedDiscount.applyTo).calledWith(amount).mockReturnValue(amountAfterApplyingDiscount);

        const amountAfterDiscount = conditionalDiscount.applyTo(amount);

        expect(amountAfterDiscount).toBe(amountAfterApplyingDiscount);
    });

    it('should not apply discount when amount is less than minimum amount', () => {
        const amount = 99.99;
        const conditionalDiscount = aDiscountAppliedWhenOverMinimumAmount(decoratedDiscount, minimumRequiredAmount);
        when(decoratedDiscount.applyTo).calledWith(amount).mockReturnValue(amountAfterApplyingDiscount);

        const amountAfterDiscount = conditionalDiscount.applyTo(amount);

        expect(amountAfterDiscount).toBe(amount);
    });

    it('should create its DTO correctly', () => {
        const conditionalDiscount = aDiscountAppliedWhenOverMinimumAmount(decoratedDiscount, minimumRequiredAmount);
        const decoratedDiscountDto = aFixedDiscountDTO().build();
        when(decoratedDiscount.toDto).mockReturnValue(decoratedDiscountDto);

        let discountDto = conditionalDiscount.toDto();

        expect(discountDto).toStrictEqual(decoratedDiscountDto);
    });

    function aDiscountAppliedWhenOverMinimumAmount(discount: Discount, minimumRequiredAmount: number): DependingOnMinimumAmountDiscount {
        return new DependingOnMinimumAmountDiscount(discount, minimumRequiredAmount);
    }
});