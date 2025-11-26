import {SummaryView} from "../../src/domain/SummaryView";
import {ConsoleSummaryView} from "../../src/infrastructure/ConsoleSummaryView";
import {Display} from "../../src/infrastructure/Display";
import {aCartContaining, anEmptyCart} from "../helpers/CartSummaryBuilder";
import {anOrder} from "../helpers/OrderDtoBuilder";

describe('ConsoleSummaryView', () => {
    let summaryView: SummaryView;
    let display: jest.Mocked<Display>;

    beforeEach(() => {
        display = {show: jest.fn()};
        summaryView = new ConsoleSummaryView(display);
    });

    it('should display an empty cart', () => {
        summaryView.show(
            anEmptyCart().build()
        );

        expect(display.show).toHaveBeenCalledWith('Cart is empty');
    });

    it('should display a cart with 1 product and no discount', () => {
        summaryView.show(
            aCartContaining(
                anOrder().withProductName('Aguacate').withPriceWithVat(1.00).withQuantity(1)
            ).withTotalProducts(1).withTotalPrice(1.00).build(),
        );

        expect(display.show).toHaveBeenCalledWith(
            "Product Name, Price with VAT, Quantity" + "\n" + "Aguacate, 1.00, 1" + "\n" + "Total Products: 1" + "\n" + "Total Price: 1.00"
        );
    });
});
