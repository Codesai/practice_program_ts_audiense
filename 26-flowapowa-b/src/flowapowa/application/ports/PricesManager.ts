import {PriceProvider} from "./PriceProvider";
import {Pricer} from "./Pricer";

export interface PricesManager extends Pricer, PriceProvider {
}