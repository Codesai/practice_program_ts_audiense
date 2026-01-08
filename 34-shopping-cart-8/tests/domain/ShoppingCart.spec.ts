import {StatefulShoppingCart} from "../../src/domain/StatefulShoppingCart";
import {SummaryView} from "../../src/domain/SummaryView";
import {ProductsRepository} from "../../src/domain/ProductsRepository";
import {aProduct} from "../helpers/ProductBuilder";
import {anOrder} from "../helpers/OrderDtoBuilder";
import {aCartContaining, anEmptyCart} from "../helpers/CartSummaryBuilder";
import {DiscountsRepository} from "../../src/domain/DiscountsRepository";
import {when} from 'jest-when'
import {aFixedDiscount, aPercentageDiscount} from "../helpers/DiscountBuilder";
import {aFixedDiscountDTO, aPercentageDiscountDTO} from "../helpers/DiscountDtoBuilder";

describe('ShoppingCart', () => {
    let summaryView: jest.Mocked<SummaryView>;
    let shoppingCart: StatefulShoppingCart;
    let availableProductsRepository: jest.Mocked<ProductsRepository>;
    let availableDiscountsRepository: jest.Mocked<DiscountsRepository>;

    beforeEach(() => {
            summaryView = {show: jest.fn(), error: jest.fn()}
            availableProductsRepository = {findProductWith: jest.fn()};
            availableDiscountsRepository = {findDiscountWith: jest.fn()};
            shoppingCart = new StatefulShoppingCart(summaryView, availableProductsRepository, availableDiscountsRepository);
        }
    );

    it('should display an empty cart', () => {
        shoppingCart.display();

        expect(summaryView.show).toHaveBeenCalledWith(anEmptyCart().build());
    });

    it('should display a cart with 1 available product', () => {
        const productName = 'A';
        when(availableProductsRepository.findProductWith).calledWith(productName).mockReturnValue(
            aProduct().withNoTaxes().withNoRevenue().thatCosts(1.00).named(productName).build()
        );

        shoppingCart.orderProductWith(productName);
        shoppingCart.display();

        expect(summaryView.show).toHaveBeenCalledWith(
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
            aPercentageDiscount().of(percentage).withCode(discountCode).build()
        );

        shoppingCart.orderProductWith(productName);
        shoppingCart.applyDiscount(discountCode);
        shoppingCart.display();

        expect(summaryView.show).toHaveBeenCalledWith(
            aCartContaining(
                anOrder().withProductName(productName).withPriceWithVat(100).withQuantity(1)
            ).withTotalProducts(1).withTotalPrice(90).withDiscount(
                aPercentageDiscountDTO().withCode(discountCode).withValue(percentage)
            ).build()
        )
    });

    it('should display a cart with 1 available product and an absolute discount', () => {
        const productName = 'Iceberg';
        when(availableProductsRepository.findProductWith).calledWith(productName).mockReturnValue(
            aProduct().withNoTaxes().withNoRevenue().thatCosts(80).named(productName).build()
        );

        const discountCode = '-5EUR';
        const fixedDiscountAmount = 5;
        when(availableDiscountsRepository.findDiscountWith).calledWith(discountCode).mockReturnValue(
            aFixedDiscount().of(fixedDiscountAmount).withCode(discountCode).build()
        );

        shoppingCart.orderProductWith(productName);
        shoppingCart.applyDiscount(discountCode);
        shoppingCart.display();

        expect(summaryView.show).toHaveBeenCalledWith(
            aCartContaining(
                anOrder().withProductName(productName).withPriceWithVat(80).withQuantity(1)
            ).withTotalProducts(1).withTotalPrice(75).withDiscount(
                aFixedDiscountDTO().withCode(discountCode).withValue(fixedDiscountAmount)
            ).build()
        )
    });

    it('should display a cart with 1 available product and a discount for buying more than 100', () => {
        const productName = 'Iceberg';
        when(availableProductsRepository.findProductWith).calledWith(productName).mockReturnValue(
            aProduct().withNoTaxes().withNoRevenue().thatCosts(101).named(productName).build()
        );

        const discountCode = '20_MORE_THAN_100';
        const fixedDiscountAmount = 20;
        when(availableDiscountsRepository.findDiscountWith).calledWith(discountCode).mockReturnValue(
            aFixedDiscount().of(fixedDiscountAmount).withCode(discountCode).build()
        );

        shoppingCart.orderProductWith(productName);
        shoppingCart.applyDiscount(discountCode);
        shoppingCart.display();

        expect(summaryView.show).toHaveBeenCalledWith(
            aCartContaining(
                anOrder().withProductName(productName).withPriceWithVat(101).withQuantity(1)
            ).withTotalProducts(1).withTotalPrice(81).withDiscount(
                aFixedDiscountDTO().withCode(discountCode).withValue(fixedDiscountAmount)
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

        expect(summaryView.show).toHaveBeenCalledWith(
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

        expect(summaryView.show).toHaveBeenCalledWith(
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

        expect(summaryView.show).toHaveBeenCalledWith(
            aCartContaining(
                anOrder().withProductName(productA).withPriceWithVat(1.00).withQuantity(2),
            ).withTotalProducts(2).withTotalPrice(2.00).build()
        );
    });
});
