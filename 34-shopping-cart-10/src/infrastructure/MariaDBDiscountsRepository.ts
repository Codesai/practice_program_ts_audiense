import {DiscountNotFoundException, DiscountsRepository} from "../domain/DiscountsRepository";
import {Connection} from "mariadb";
import {Discount} from "../domain/discounts/Discount";
import {PercentageDiscount} from "../domain/discounts/discountTypes/PercentageDiscount";
import {Percentage} from "../domain/orders/Percentage";
import {DiscountCode} from "../domain/discounts/DiscountCode";
import {FixedDiscount} from "../domain/discounts/discountTypes/FixedDiscount";
import {
    AppliedOverMinimumTotalPriceDiscount
} from "../domain/discounts/discountTypes/AppliedOverMinimumTotalPriceDiscount";

export class MariaDBDiscountsRepository implements DiscountsRepository {
    private readonly connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async findDiscountWith(discountCode: string): Promise<Discount> {
        const rows = await this.connection.query(
            "SELECT d.code, d.type, d.value, dc.type as condition_type, dc.data as condition_data " +
            "FROM discounts d " +
            "LEFT JOIN discount_conditions dc ON d.code = dc.code " +
            "WHERE d.code = ?",
            [discountCode]
        );

        if (rows.length === 0) {
            throw new DiscountNotFoundException(`Not found ${discountCode}`);
        }

        const row = rows[0];

        const discount = this.createDiscount(row.code, row.value, row.type);
        return this.makeConditionalIfRequired(discount, row.condition_type, row.condition_data);
    }

    private makeConditionalIfRequired(discount: Discount, conditionType: string, conditionData: any): Discount {
        if (conditionType === 'MIN_REQUIRED_AMOUNT') {
            return new AppliedOverMinimumTotalPriceDiscount(discount, Number(conditionData.value));
        }
        return discount;
    }

    private createDiscount(codeAsString: string, value: string, discountType: string): Discount {
        const code = new DiscountCode(codeAsString);
        if (discountType === 'PERCENTAGE') {
            return new PercentageDiscount(new Percentage(Number(value)), code);
        } else {
            return new FixedDiscount(Number(value), code);
        }
    }
}
