import {Discount} from "../Discount";
import {DiscountDto} from "../DiscountDto";

export class DependingOnMinimumAmountDiscount implements Discount {
    private readonly discount: Discount;
    private readonly minimumRequiredAmount: number;

    constructor(discount: Discount, minimumRequiredAmount: number) {
        this.discount = discount;
        this.minimumRequiredAmount = minimumRequiredAmount;
    }

    applyTo(amount: number): number {
        if (amount < this.minimumRequiredAmount) {
            return amount;
        }
        return this.discount.applyTo(amount);
    }

    toDto(): DiscountDto {
        return this.discount.toDto();
    }
}