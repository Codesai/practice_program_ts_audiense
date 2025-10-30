import {ShoppingCart} from "../src/ShoppingCart";
import {SummaryView} from "../src/SummaryView";
import {AvailableProductsRepository} from "../src/AvailableProductsRepository";
import {aProduct} from "./ProductBuilder";
import {anOrder} from "./OrderBuilder";
import {aCartContaining, anEmptyCart} from "./CartContentBuilder";
import {CartSummary} from "../src/CartSummary";
import {Product} from "../src/Product";

describe('ShoppingCart', () => {
    let display: jest.Mocked<SummaryView>;
    let shoppingCart: ShoppingCart;
    let availableProductsRepository: jest.Mocked<AvailableProductsRepository>;

    beforeEach(() => {
            display = {show: jest.fn()}
            availableProductsRepository = {findProductWith: jest.fn()}
            shoppingCart = new ShoppingCart(display, availableProductsRepository);
        }
    )

    it('should display an empty cart', () => {
        shoppingCart.display();

        expect(display.show).toHaveBeenCalledWith(anEmptyCart().build())
    });

    it.each([
        [
            aProduct().withNoTaxes().withNoRevenue().thatCosts(1.00).named('A').build(),
            aCartContaining(anOrder().withProductName('A').withPriceWithVat(1.00).withQuantity(1)).withTotalProducts(1).withTotalPrice(1.00).build()
        ],
        [
            aProduct().withNoTaxes().withRevenuePercentage(20).thatCosts(1.00).named('A').build(),
            aCartContaining(anOrder().withProductName('A').withPriceWithVat(1.20).withQuantity(1)).withTotalProducts(1).withTotalPrice(1.20).build()
        ]
    ])('should display a cart with 1 available product', (product: Product, expectedCartContent: CartSummary) => {
        availableProductsRepository.findProductWith.mockReturnValueOnce(product);
        shoppingCart.addItem('A');

        shoppingCart.display();

        expect(display.show).toHaveBeenCalledWith(expectedCartContent)
    })
})
