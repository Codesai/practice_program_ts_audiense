import {aProduct} from "./helpers/ProductBuilder";
import {Price} from "../src/Price";

describe('Product', () => {
    it('should calculate the final price without taxes nor revenue', () => {
        const product = aProduct().thatCosts(1.00).withNoTaxes().withNoRevenue().build();

        expect(product.finalPrice()).toEqual(aPriceOf(1.00));
    });

    it('should calculate the final price with revenue', () => {
        const product = aProduct().thatCosts(1.00).withNoTaxes().withRevenuePercentage(100).build();

        expect(product.finalPrice()).toEqual(aPriceOf(2.00));
    });

    it('should calculate the final price with taxes', () => {
        const product = aProduct().thatCosts(1.00).withTaxPercentage(100).withNoRevenue().build();

        expect(product.finalPrice()).toEqual(aPriceOf(2.00));
    });

    it('should calculate the final price with taxes an revenue', () => {
        const product = aProduct().thatCosts(1.00).withTaxPercentage(100).withRevenuePercentage(10).build();

        expect(product.finalPrice()).toEqual(aPriceOf(2.20));
    });

    it('should work correctly with a fraction edge case value', () => {
        const product = aProduct().thatCosts(1.00).withTaxPercentage(10).withNoRevenue().build();

        expect(product.finalPrice()).toEqual(aPriceOf(1.10));
    });

    function aPriceOf(value: number): Price {
        return new Price(value);
    }
})

