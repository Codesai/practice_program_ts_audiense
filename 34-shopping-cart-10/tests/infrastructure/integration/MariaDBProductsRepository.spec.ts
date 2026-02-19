import {MariaDBProductsRepository} from "../../../src/infrastructure/MariaDBProductsRepository";

import {dbConnection} from "./setup/DatabaseConnection";
import {getProductsTable, ProductsInDb} from "./helpers/ProductsInDb";
import {ProductNotFoundException, ProductsRepository} from "../../../src/domain/ProductsRepository";
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
        await productsTable.addProduct({
            name: "Pera",
            cost: 3.00,
            revenuePercentage: 15,
            taxPercentage: 6
        });
        await productsTable.addProduct({
            name: "Aguacate",
            cost: 1.00,
            revenuePercentage: 50,
            taxPercentage: 5
        });

        const product = await productRepository.findProductWith("Aguacate");

        expect(product).toEqual(
            aProduct()
                .named("Aguacate")
                .thatCosts(1.00)
                .withTaxPercentage(5)
                .withRevenuePercentage(50).build()
        );
    });

    it('should throw an error when product is not found', async () => {
        await expect(productRepository.findProductWith("non_existing_product"))
            .rejects
            .toThrow(ProductNotFoundException);
    });
});
