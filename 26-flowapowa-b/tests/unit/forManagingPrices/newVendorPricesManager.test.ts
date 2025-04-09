import {PricesManager} from "../../../src/flowapowa/application/ports/PricesManager";
import {NewVendorPricesManager} from "../../../src/flowapowa/forManagingPrices/NewVendorPricesManager";
import {NewVendorProductProvider} from "../../../src/flowapowa/lib/NewVendorProductProvider";
import {behavesLikeAPricesManager} from "./behavesLikeAPricesManager.role";

describe('New Vendor Prices Manager', behavesLikeAPricesManager({
    getInstance(): PricesManager {
        return new NewVendorPricesManager(new NewVendorProductProvider());
    }
}));




