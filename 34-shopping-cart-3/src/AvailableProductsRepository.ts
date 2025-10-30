import {Product} from "./Product";

export interface AvailableProductsRepository {
    findProductWith(productName: string): Product;
}
