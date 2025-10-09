import {ContentDisplay} from "../src/ContentDisplay";
import {ConsoleContentDisplay} from "../src/infrastructure/ConsoleContentDisplay";
import {Display} from "../src/infrastructure/Display";
import {CartContent} from "../src/CartContent";

describe('ShoppingCart', () => {
    let contentDisplay: ContentDisplay;
    let display: jest.Mocked<Display>;

    display = {show: jest.fn()};

    it('should display an empty cart', () => {
        contentDisplay = new ConsoleContentDisplay(display);

        contentDisplay.show(new CartContent([], 0, 0));

        expect(display.show).toHaveBeenCalledWith('Cart is empty');
    });

});