import {Product} from "./products/Product";

export interface ProductsRepository {
    findProductWith(productName: string): Product;
}
