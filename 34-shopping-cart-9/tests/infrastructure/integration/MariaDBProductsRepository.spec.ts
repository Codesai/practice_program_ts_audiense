import {MariaDBProductsRepository} from "../../../src/infrastructure/MariaDBProductsRepository";
import {Product} from "../../../src/domain/products/Product";
import {Percentage} from "../../../src/domain/orders/Percentage";
import {Connection} from "mariadb";

import {dbConnection} from "./setup/DatabaseConnection";
import {getProductsTable, ProductsTable} from "./helpers/ProductsTable";
import {ProductsRepository} from "../../../src/domain/ProductsRepository";

describe('Product Repository', () => {
    let productsTable: ProductsTable;
    let productRepository: ProductsRepository;

    beforeEach(async () => {
        const connection = await dbConnection().get();
        productRepository = new MariaDBProductsRepository(connection);
        productsTable = getProductsTable(connection);
        await productsTable.drop();
    });

    afterEach(async () => {
        await dbConnection().close();
    });

    it('should find products', async () => {
        const aProduct = {
            name: "Aguacate",
            cost: 1.00,
            revenuePercentage: 50,
            taxPercentage: 5
        };
        await productsTable.addProduct(aProduct);

        const product = await productRepository.findProductWith(aProduct.name);

        const expectedProduct = new Product(aProduct.name,
            aProduct.cost,
            percentage(aProduct.revenuePercentage),
            percentage(aProduct.taxPercentage));
        expect(product).toEqual(expectedProduct);
    });

    it('should throw an error when product is not found', async () => {
        const aProduct = {
            name: "existing_product",
            cost: 1.00,
            revenuePercentage: 0,
            taxPercentage: 0
        };
        await productsTable.addProduct(aProduct);

        await expect(productRepository.findProductWith("non_existing_product"))
            .rejects
            .toThrow('Not found non_existing_product');
    });

    function percentage(value: number): Percentage {
        return new Percentage(value);
    }
});
