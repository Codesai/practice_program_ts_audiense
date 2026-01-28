import {Product} from "../domain/products/Product";
import {ProductsRepository} from "../domain/ProductsRepository";
import {Percentage} from "../domain/orders/Percentage";
import {Connection} from "mariadb";
import {ProductNotFoundException} from "../domain/products/ProductNotFoundException";

export class MariaDBProductsRepository implements ProductsRepository {

    private _connection: Connection;

    constructor(_connection: Connection) {
        this._connection = _connection;
    }

    async findProductWith(productName: string): Promise<Product> {
        const rows = await this._connection.query("select * from products where name = ?", [productName]);
        if (rows.length === 0) {
            throw new ProductNotFoundException(`Not found ${productName}`);
        }
        const firstProductData = rows[0];
        return new Product(firstProductData.name,
            parseFloat(firstProductData.cost),
            new Percentage(firstProductData.revenue_percentage),
            new Percentage(firstProductData.tax_percentage));
    }
}