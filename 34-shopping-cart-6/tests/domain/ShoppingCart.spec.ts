import {ShoppingCart} from "../../src/domain/ShoppingCart";
import {SummaryView} from "../../src/domain/SummaryView";
import {ProductsRepository} from "../../src/domain/ProductsRepository";
import {aProduct} from "../helpers/ProductBuilder";
import {anOrder} from "../helpers/OrderDtoBuilder";
import {aCartContaining, anEmptyCart} from "../helpers/CartSummaryBuilder";
import {DiscountsRepository} from "../../src/domain/DiscountsRepository";
import {when} from 'jest-when'
import {aDiscount, aDiscountCode} from "../helpers/DiscountBuilder";
import {CartSummaryError} from "../../src/domain/CartSummaryError";
import {ProductNotFoundException} from "../../src/domain/ProductNotFoundException";
import {aDiscountDto} from "../helpers/DiscountDtoBuilder";

describe('ShoppingCart', () => {
    let view: jest.Mocked<SummaryView>;
    let shoppingCart: ShoppingCart;
    let availableProductsRepository: jest.Mocked<ProductsRepository>;
    let availableDiscountsRepository: jest.Mocked<DiscountsRepository>;

    beforeEach(() => {
            view = {show: jest.fn(), error: jest.fn()}
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

        shoppingCart.orderProductWith(productName);
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
        const percentage = 10;
        when(availableDiscountsRepository.findDiscountWith).calledWith(discountCode).mockReturnValue(
            aDiscount().ofPercentage(percentage).with(aDiscountCode(discountCode)).build()
        );

        shoppingCart.orderProductWith(productName);
        shoppingCart.applyDiscount(discountCode);
        shoppingCart.display();

        expect(view.show).toHaveBeenCalledWith(
            aCartContaining(
                anOrder().withProductName(productName).withPriceWithVat(100).withQuantity(1)
            ).withTotalProducts(1).withTotalPrice(90).withDiscount(
                aDiscountDto().withCode(discountCode).withPercentage(percentage)
            ).build()
        )
    });

    it('should display a cart with 2 free available products', () => {
        const productA = 'A';
        const productB = 'B';
        when(availableProductsRepository.findProductWith).calledWith(productA).mockReturnValue(
            aProduct().withNoTaxes().withNoRevenue().thatCosts(0).named(productA).build()
        );
        when(availableProductsRepository.findProductWith).calledWith(productB).mockReturnValue(
            aProduct().withNoTaxes().withNoRevenue().thatCosts(0).named(productB).build()
        );

        shoppingCart.orderProductWith(productA);
        shoppingCart.orderProductWith(productB);
        shoppingCart.display();

        expect(view.show).toHaveBeenCalledWith(
            aCartContaining(
                anOrder().withProductName(productA).withPriceWithVat(0.00).withQuantity(1),
                anOrder().withProductName(productB).withPriceWithVat(0.00).withQuantity(1)
            ).withTotalProducts(2).withTotalPrice(0.00).build()
        );
    });

    it('should display a cart with 2 available products', () => {
        const productA = 'A';
        const productB = 'B';
        when(availableProductsRepository.findProductWith).calledWith(productA).mockReturnValue(
            aProduct().withNoTaxes().withNoRevenue().thatCosts(2.00).named(productA).build()
        );
        when(availableProductsRepository.findProductWith).calledWith(productB).mockReturnValue(
            aProduct().withNoTaxes().withNoRevenue().thatCosts(1.00).named(productB).build()
        );

        shoppingCart.orderProductWith(productA);
        shoppingCart.orderProductWith(productB);
        shoppingCart.display();

        expect(view.show).toHaveBeenCalledWith(
            aCartContaining(
                anOrder().withProductName(productA).withPriceWithVat(2.00).withQuantity(1),
                anOrder().withProductName(productB).withPriceWithVat(1.00).withQuantity(1)
            ).withTotalProducts(2).withTotalPrice(3.00).build()
        );
    });

    it('should display a cart with 1 available product twice', () => {
        const productA = 'A';
        when(availableProductsRepository.findProductWith).calledWith(productA).mockReturnValue(
            aProduct().withNoTaxes().withNoRevenue().thatCosts(1.00).named(productA).build()
        );

        shoppingCart.orderProductWith(productA);
        shoppingCart.orderProductWith(productA);
        shoppingCart.display();

        expect(view.show).toHaveBeenCalledWith(
            aCartContaining(
                anOrder().withProductName(productA).withPriceWithVat(1.00).withQuantity(2),
            ).withTotalProducts(2).withTotalPrice(2.00).build()
        );
    });

    it('should display an error when adding an unknown product', () => {
        const productName = 'potatoes';
        const errorMessage = `${productName} not found`;
        availableProductsRepository.findProductWith.mockImplementationOnce(
            (): never => {
                throw new ProductNotFoundException(errorMessage);
            }
        );

        shoppingCart.orderProductWith(productName);
        shoppingCart.display();

        expect(view.error).toHaveBeenCalledWith(new CartSummaryError(errorMessage));
    });
});
