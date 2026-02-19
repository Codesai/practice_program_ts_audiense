import {Product} from "./products/Product";

export interface ProductsRepository {
    findProductWith(productName: string): Promise<Product>;
}

export class ProductNotFoundException extends Error {
    constructor(message: string) {
        super(message);
    }
}