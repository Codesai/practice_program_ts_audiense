import {dbConnection} from "./setup/DatabaseConnection";
import {DiscountsInDb, getDiscountsTable} from "./helpers/DiscountsInDb";
import {DiscountNotFoundException, DiscountsRepository} from "../../../src/domain/DiscountsRepository";
import {MariaDBDiscountsRepository} from "../../../src/infrastructure/MariaDBDiscountsRepository";
import {aFixedDiscount, aPercentageDiscount, apply} from "../../helpers/DiscountBuilder";

describe('MariaDBDiscountsRepository', () => {
    let discountsTable: DiscountsInDb;
    let discountsRepository: DiscountsRepository;

    beforeEach(async () => {
        const connection = await dbConnection().get();
        discountsRepository = new MariaDBDiscountsRepository(connection);
        discountsTable = getDiscountsTable(connection);
        await discountsTable.drop();
    });

    afterEach(async () => {
        await dbConnection().close();
    });

    it('should find a percentage discount given its code', async () => {
        await discountsTable.addDiscount({
            code: 'PROMO_PERCENTAGE',
            type: 'PERCENTAGE',
            value: 10
        });
        await discountsTable.addDiscount({
            code: 'ANOTHER_PROMO_PERCENTAGE',
            type: 'PERCENTAGE',
            value: 3
        });

        const discount = await discountsRepository.findDiscountWith('PROMO_PERCENTAGE');

        expect(discount).toEqual(
            aPercentageDiscount().withCode('PROMO_PERCENTAGE').of(10).build()
        );
    });

    it('should find a fixed discount given its code', async () => {
        await discountsTable.addDiscount({
            code: 'ANOTHER_PROMO_PERCENTAGE',
            type: 'PERCENTAGE',
            value: 3
        });
        await discountsTable.addDiscount({
            code: 'PROMO_FIXED',
            type: 'FIXED',
            value: 5
        });

        const discount = await discountsRepository.findDiscountWith('PROMO_FIXED');

        expect(discount).toEqual(
            aFixedDiscount().withCode('PROMO_FIXED').of(5).build()
        );
    });

    it('should find a discount with conditions', async () => {
        await discountsTable.addDiscountWithMinRequiredAmountCondition({
            code: 'PROMO_WITH_CONDITION',
            type: 'PERCENTAGE',
            value: 10,
            amount: 50
        });
        await discountsTable.addDiscount({
            code: 'PROMO_FIXED',
            type: 'FIXED',
            value: 5
        });

        const discount = await discountsRepository.findDiscountWith('PROMO_WITH_CONDITION');

        expect(discount).toEqual(
            apply(
                aPercentageDiscount().withCode('PROMO_WITH_CONDITION').of(10)
            ).whenTotalPriceIsEqualOrGreaterThan(50).build()
        );
    });

    it('should throw an error when discount is not found', async () => {
        await expect(discountsRepository.findDiscountWith("NON_EXISTING"))
            .rejects
            .toThrow(DiscountNotFoundException);
    });
});
