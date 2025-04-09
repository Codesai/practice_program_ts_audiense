import {DeprecatedPriceProvider} from '../../../src/flowapowa/forManagingPrices/DeprecatedPriceProvider'
import {LegacyPricesManager} from "../../../src/flowapowa/forManagingPrices/LegacyPricesManager";
import {PricesManager} from "../../../src/flowapowa/application/ports/PricesManager";
import {behavesLikeAPricesManager} from "./behavesLikeAPricesManager.role";

describe('LegacyPricesManager', behavesLikeAPricesManager({
    getInstance(): PricesManager {
        return new LegacyPricesManager(new DeprecatedPriceProvider())
    }
}));
