import {ShoppingCart} from "../src/ShoppingCart";
import {CartContent} from "../src/CartContent";
import {ContentDisplay} from "../src/ContentDisplay";
import {AvailableProductsRepository} from "../src/AvailableProductsRepository";
import {Product} from "../src/Product";
import {Order} from "../src/Order";

describe('ShoppingCart', () => {
    let display: jest.Mocked<ContentDisplay>;
    let shoppingCart: ShoppingCart;
    let availableProductsRepository: jest.Mocked<AvailableProductsRepository>;

    beforeEach(() => {
            display = {
                show: jest.fn()
            }
            availableProductsRepository = {
                findProductWith: jest.fn()
            }
            shoppingCart = new ShoppingCart(display, availableProductsRepository);
        }
    )

    it('should display an empty cart', () => {
        shoppingCart.display();

        expect(display.show).toHaveBeenCalledWith(new CartContent([], 0, 0))
    });

    it('should display a cart with 1 available product', () => {
        availableProductsRepository.findProductWith.mockReturnValueOnce(new Product('A', 1.00, 0, 0));
        shoppingCart.addItem('A');

        shoppingCart.display();

        const order = new Order('A', 1.00, 1);
        expect(display.show).toHaveBeenCalledWith(new CartContent([order], 1, 1.00))
    })
})
