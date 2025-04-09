import {PriceId} from "../PriceId";

export interface PriceProvider {
    getPrice(id: PriceId): number;
}