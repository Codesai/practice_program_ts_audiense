import {Connection} from "mariadb";

export function getProductsTable(connection: Connection): ProductsTable {
    return new ProductsTable(connection);
}

export class ProductsTable {

    private readonly connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async addProduct({name, cost, revenuePercentage, taxPercentage}: {
        name: string,
        cost: number,
        revenuePercentage: number,
        taxPercentage: number
    }): Promise<void> {
        await this.connection.query("INSERT INTO products (name, cost, revenue_percentage, tax_percentage)\n" +
            "VALUES (?, ?, ?, ?);", [name, cost, revenuePercentage, taxPercentage]);
    }

    async drop(): Promise<void> {
        await this.connection.query("DELETE FROM products;");
    }
}