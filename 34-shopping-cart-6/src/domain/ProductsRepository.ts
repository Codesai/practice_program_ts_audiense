import {Product} from "./Product";

export interface ProductsRepository {
    findProductWith(productName: string): Product;
}
