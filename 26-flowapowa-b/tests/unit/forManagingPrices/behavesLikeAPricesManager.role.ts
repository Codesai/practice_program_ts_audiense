import {PriceNotFoundFor} from "../../../src/flowapowa/application/PriceNotFoundFor";
import {PricesManager} from "../../../src/flowapowa/application/ports/PricesManager";
import {Price} from "../../../src/flowapowa/application/Price";
import {priceIdFor} from "../../helpers/PricesHelper";

type PricesManagerTestContext = {
    getInstance(): PricesManager;
};

export function behavesLikeAPricesManager(testContext: PricesManagerTestContext) {
    return () => describe('behaves like a prices manager', () => {
        let pricesManager: PricesManager;

        beforeEach(() => {
            pricesManager = testContext.getInstance();
        });

        test('sets and provides prices for elements', () => {
            const rosePriceId = priceIdFor('rose');
            const daisyPriceId = priceIdFor('daisy');

            pricesManager.setPrice(new Price(rosePriceId, 1.50));
            pricesManager.setPrice(new Price(daisyPriceId, 0.80));

            expect(pricesManager.getPrice(rosePriceId)).toBe(1.50)
            expect(pricesManager.getPrice(daisyPriceId)).toBe(0.80)
        });

        test('throws an exception when trying to get a price for an unknown element', () => {
            const unknownPriceId = priceIdFor('unknown');
            expect(() => pricesManager.getPrice(unknownPriceId)).toThrow(new PriceNotFoundFor(unknownPriceId));
        });
    });
}
