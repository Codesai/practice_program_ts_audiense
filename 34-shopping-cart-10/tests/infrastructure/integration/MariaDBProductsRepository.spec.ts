import {MariaDBProductsRepository} from "../../../src/infrastructure/MariaDBProductsRepository";

import {dbConnection} from "./setup/DatabaseConnection";
import {getProductsTable, ProductsInDb} from "./helpers/ProductsInDb";
import {ProductsRepository} from "../../../src/domain/ProductsRepository";
import {ProductNotFoundException} from "../../../src/domain/products/ProductNotFoundException";
import {aProduct} from "../../helpers/ProductBuilder";

describe('Product Repository', () => {
    let productsTable: ProductsInDb;
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

    it('should find a product given its name', async () => {
        const aProductData = {
            name: "Aguacate",
            cost: 1.00,
            revenuePercentage: 50,
            taxPercentage: 5
        };
        await productsTable.addProduct(aProductData);

        const product = await productRepository.findProductWith(aProductData.name);

        const expectedProduct = aProduct()
            .named(aProductData.name)
            .thatCosts(aProductData.cost)
            .withTaxPercentage(aProductData.taxPercentage)
            .withRevenuePercentage(aProductData.revenuePercentage).build();

        expect(product).toEqual(expectedProduct);
    });

    it('should throw an error when product is not found', async () => {
        const aProductData = {
            name: "existing_product",
            cost: 1.00,
            revenuePercentage: 0,
            taxPercentage: 0
        };
        await productsTable.addProduct(aProductData);

        await expect(productRepository.findProductWith("non_existing_product"))
            .rejects
            .toThrow(ProductNotFoundException);
    });
});
