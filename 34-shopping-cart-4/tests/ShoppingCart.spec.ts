import {ShoppingCart} from "../src/ShoppingCart";
import {SummaryView} from "../src/SummaryView";
import {ProductsRepository} from "../src/ProductsRepository";
import {aProduct} from "./helpers/ProductBuilder";
import {anOrder} from "./helpers/OrderDtoBuilder";
import {aCartContaining, anEmptyCart} from "./helpers/CartSummaryBuilder";
import {DiscountsRepository} from "../src/DiscountsRepository";
import {when} from 'jest-when'
import {aDiscount, aDiscountCode} from "./helpers/DiscountBuilder";

describe('ShoppingCart', () => {
    let view: jest.Mocked<SummaryView>;
    let shoppingCart: ShoppingCart;
    let availableProductsRepository: jest.Mocked<ProductsRepository>;
    let availableDiscountsRepository: jest.Mocked<DiscountsRepository>;

    beforeEach(() => {
            view = {show: jest.fn()}
            availableProductsRepository = {findProductWith: jest.fn()};
            availableDiscountsRepository = {findDiscountWith: jest.fn()};
            shoppingCart = new ShoppingCart(view, availableProductsRepository, availableDiscountsRepository);
        }
    );

    it('should display an empty cart', () => {
        shoppingCart.display();

        expect(view.show).toHaveBeenCalledWith(anEmptyCart().build());
    });

    it('should display a cart with 1 available product', () => {
        const productName = 'A';
        when(availableProductsRepository.findProductWith).calledWith(productName).mockReturnValue(
            aProduct().withNoTaxes().withNoRevenue().thatCosts(1.00).named(productName).build()
        );

        shoppingCart.addItem(productName);
        shoppingCart.display();

        expect(view.show).toHaveBeenCalledWith(
            aCartContaining(
                anOrder().withProductName(productName).withPriceWithVat(1.00).withQuantity(1)
            ).withTotalProducts(1).withTotalPrice(1.00).build()
        );
    });

    it('should display a cart with 1 available product and an available discount', () => {
        const discountCode = 'PROMO_10';
        const productName = 'Iceberg';
        when(availableProductsRepository.findProductWith).calledWith(productName).mockReturnValue(
            aProduct().withNoTaxes().withNoRevenue().thatCosts(100).named(productName).build()
        );
        when(availableDiscountsRepository.findDiscountWith).calledWith(discountCode).mockReturnValue(
            aDiscount().ofPercentage(10).with(aDiscountCode(discountCode)).build()
        );

        shoppingCart.addItem(productName);
        shoppingCart.applyDiscount(discountCode);
        shoppingCart.display();

        expect(view.show).toHaveBeenCalledWith(
            aCartContaining(
                anOrder().withProductName(productName).withPriceWithVat(100).withQuantity(1)
            ).withTotalProducts(1).withTotalPrice(90).withDiscountCode(discountCode).build()
        )
    });
});
