import {Product} from "./Product";

export class OrderCancelledException extends Error {
    constructor(product: Product) {
        super("Order of " + product.getName() + " was cancelled!");
    }
}