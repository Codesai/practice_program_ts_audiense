import {SummaryView} from "../../src/domain/SummaryView";
import {ConsoleSummaryView} from "../../src/infrastructure/ConsoleSummaryView";
import {Display} from "../../src/infrastructure/Display";
import {aCartContaining, anEmptyCart} from "../helpers/CartSummaryBuilder";
import {anOrder} from "../helpers/OrderDtoBuilder";
import {aDiscountDto} from "../helpers/DiscountDtoBuilder";

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
            "Product Name, Price with VAT, Quantity" + "\n" +
            "Aguacate, 1.00, 1" + "\n" +
            "Total Products: 1" + "\n" +
            "Total Price: 1.00"
        );
    });

    it('should display a cart with 2 product and no discount', () => {
        summaryView.show(
            aCartContaining(
                anOrder().withProductName('Aguacate').withPriceWithVat(1.00).withQuantity(1),
                anOrder().withProductName('Pan').withPriceWithVat(1.00).withQuantity(1)
            ).withTotalProducts(2).withTotalPrice(2.00).build(),
        );

        expect(display.show).toHaveBeenCalledWith(
            "Product Name, Price with VAT, Quantity" + "\n" +
            "Aguacate, 1.00, 1" + "\n" +
            "Pan, 1.00, 1" + "\n" +
            "Total Products: 2" + "\n" +
            "Total Price: 2.00"
        );
    });

    it.each([
        ["PROMO_5", 5],
        ["PROMO_10", 10]
    ])('should display a cart with 1 product and a %s discount with %i percentage', (code: string , percentage: number) => {
        summaryView.show(
            aCartContaining(
                anOrder().withProductName('Aguacate').withPriceWithVat(1.00).withQuantity(1)
            ).withTotalProducts(1).withTotalPrice(1.00).withDiscount(
                aDiscountDto().withCode(code).withPercentage(percentage)
            ).build()
        );

        expect(display.show).toHaveBeenCalledWith(
            "Product Name, Price with VAT, Quantity" + "\n" +
            "Aguacate, 1.00, 1" + "\n" +
            `Promotion: ${percentage}% off with code ${code}` + "\n" +
            "Total Products: 1" + "\n" +
            "Total Price: 1.00"
        );
    });
});
