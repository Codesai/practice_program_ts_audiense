import {DeprecatedPriceProvider} from '../../../src/flowapowa/forManagingPrices/DeprecatedPriceProvider'
import {Element} from "../../../src/flowapowa/application/Recipe";
import {LegacyPricesManager} from "../../../src/flowapowa/forManagingPrices/LegacyPricesManager";
import {PricesManager} from "../../../src/flowapowa/application/PricesManager";

function createPricesManager(): PricesManager {
    return new LegacyPricesManager(new DeprecatedPriceProvider());
}

describe('LegacyPricesManager', () => {
    it('sets and provides prices for elements', () => {
        const pricesManager = createPricesManager();
        const rose = new Element('rose', 1);
        const daisy = new Element('daisy', 1);

        pricesManager.set(rose, 1.50);
        pricesManager.set(daisy, 0.80);

        expect(pricesManager.getElementPrice(rose)).toBe(1.50)
        expect(pricesManager.getElementPrice(daisy)).toBe(0.80)
    })
})
