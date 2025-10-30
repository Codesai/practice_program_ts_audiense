import {SummaryView} from "../src/SummaryView";
import {ConsoleSummaryView} from "../src/infrastructure/ConsoleSummaryView";
import {Display} from "../src/infrastructure/Display";
import {CartSummary} from "../src/CartSummary";
import { OrderDto } from "../src/OrderDto";

describe('ConsoleSummaryView', () => {
    let contentDisplay: SummaryView;
    let display: jest.Mocked<Display>;

    beforeEach(() => {
        display = {show: jest.fn()};
        contentDisplay = new ConsoleSummaryView(display);
    });

    it('should display an empty cart', () => {
        contentDisplay.show(new CartSummary([], 0, 0));

        expect(display.show).toHaveBeenCalledWith('Cart is empty');
    });

    it('should display a cart with 1 product and non discounted price', () => {
        contentDisplay.show(new CartSummary([new OrderDto('Aguacate', 1.00, 1)], 1, 1.00));
        expect(display.show).toHaveBeenCalledWith("Product Name, Price with VAT, Quantity" + "\n" + "Aguacate, 1.00, 1" + "\n" + "Total Products: 1" + "\n" + "Total Price: 1.00");
    });

});