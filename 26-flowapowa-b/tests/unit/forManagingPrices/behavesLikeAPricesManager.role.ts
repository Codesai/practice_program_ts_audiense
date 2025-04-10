import {PriceNotFoundFor} from "../../../src/flowapowa/application/PriceNotFoundFor";
import {PricesManager} from "../../../src/flowapowa/application/ports/PricesManager";
import {Price} from "../../../src/flowapowa/application/Price";
import {ElementId} from "../../../src/flowapowa/application/ElementId";

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
            const roseElementId = ElementId.from('rose');
            const daisyElementId = ElementId.from('daisy');

            pricesManager.setPrice(roseElementId, new Price(1.50));
            pricesManager.setPrice(daisyElementId, new Price(0.80));

            expect(pricesManager.getPrice(roseElementId)).toBe(1.50)
            expect(pricesManager.getPrice(daisyElementId)).toBe(0.80)
        });

        test('throws an exception when trying to get a price for an unknown element', () => {
            const unknownElementId = ElementId.from('unknown');
            expect(() => pricesManager.getPrice(unknownElementId)).toThrow(new PriceNotFoundFor(unknownElementId));
        });
    });
}
