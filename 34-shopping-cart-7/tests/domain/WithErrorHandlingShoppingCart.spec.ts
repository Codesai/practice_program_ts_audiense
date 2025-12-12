import {WithErrorHandlingShoppingCart} from "../../src/domain/WithErrorHandlingShoppingCart";
import {SummaryView} from "../../src/domain/SummaryView";
import {ShoppingCart} from "../../src/domain/ShoppingCart";
import {CartSummaryError} from "../../src/domain/CartSummaryError";
import {ErrorType} from "../../src/domain/ErrorType";
import {ProductNotFoundException} from "../../src/domain/ProductNotFoundException";
import {DiscountNotFoundException} from "../../src/domain/DiscountNotFoundException";

describe('WithErrorHandlingShoppingCart', () => {
    let shoppingCart: ShoppingCart;
    let decoratedCart: jest.Mocked<ShoppingCart>;
    let summaryView: jest.Mocked<SummaryView>;

    beforeEach(() => {
        decoratedCart = {
            display: jest.fn(),
            orderProductWith: jest.fn(),
            applyDiscount: jest.fn()
        };
        summaryView = {
            show: jest.fn(),
            error: jest.fn()
        };
        shoppingCart = new WithErrorHandlingShoppingCart(decoratedCart, summaryView);
    });

    describe('display', () => {
        it('should delegate to decorated cart', () => {
            shoppingCart.display();
            expect(decoratedCart.display).toHaveBeenCalled();
        });
    });

    describe('orderProductWith', () => {
        it('should delegate to decorated cart when product exists', () => {
            const productName = 'Aguacate';

            shoppingCart.orderProductWith(productName);

            expect(decoratedCart.orderProductWith).toHaveBeenCalledWith(productName);
            expect(summaryView.error).not.toHaveBeenCalled();
        });

        it('should show error when product does not exist', () => {
            const nonExistentProduct = 'lalala';
            decoratedCart.orderProductWith.mockImplementation(() => {
                throw new ProductNotFoundException(nonExistentProduct);
            });

            shoppingCart.orderProductWith(nonExistentProduct);

            expect(summaryView.error).toHaveBeenCalledWith(
                new CartSummaryError(ErrorType.NOT_FOUND_PRODUCT, nonExistentProduct)
            );
        });
    });

    describe('applyDiscount', () => {
        it('should delegate to decorated cart when discount exists', () => {
            const discountCode = 'PROMO_5';

            shoppingCart.applyDiscount(discountCode);

            expect(decoratedCart.applyDiscount).toHaveBeenCalledWith(discountCode);
            expect(summaryView.error).not.toHaveBeenCalled();
        });

        it('should show error when discount does not exist', () => {
            const nonExistentDiscount = 'ñññññ';
            decoratedCart.applyDiscount.mockImplementation(() => {
                throw new DiscountNotFoundException(nonExistentDiscount);
            });

            shoppingCart.applyDiscount(nonExistentDiscount);

            expect(summaryView.error).toHaveBeenCalledWith(
                new CartSummaryError(ErrorType.NOT_FOUND_DISCOUNT, nonExistentDiscount)
            );
        });
    });
});