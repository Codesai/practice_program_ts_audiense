import {Coffee} from "../src/Coffee";
import {Tea} from "../src/Tea";
import {HotChocolate} from "../src/HotChocolate";
import {WithMilk} from "../src/WithMilk";
import {WithCream} from "../src/WithCream";

describe('Beverage pricing', () => {

    it('computes coffee price', () => {
        const coffee = new Coffee();

        expect(coffee.price()).toBeCloseTo(1.20, 2);
    });

    it('computes tea price', () => {
        const tea = new Tea();

        expect(tea.price()).toBeCloseTo(1.50, 2);
    });

    it('computes hot chocolate price', () => {
        const hotChocolate = new HotChocolate();

        expect(hotChocolate.price()).toBeCloseTo(1.45, 2);
    });

    it('computes tea with milk price', () => {
        const teaWithMilk = new WithMilk(new Tea());

        expect(teaWithMilk.price()).toBeCloseTo(1.60, 2);
    });

    it('computes coffee with milk price', () => {
        const coffeeWithMilk = new WithMilk(new Coffee());

        expect(coffeeWithMilk.price()).toBeCloseTo(1.30, 2);
    });

    it('computes coffee with milk and cream price', () => {
        const coffeeWithMilkAndCream = new WithCream(new WithMilk(new Coffee()));

        expect(coffeeWithMilkAndCream.price()).toBeCloseTo(1.45, 2);
    });

    it('computes hot chocolate with cream price', () => {
        const hotChocolateWithCream = new WithCream(new HotChocolate());

        expect(hotChocolateWithCream.price()).toBeCloseTo(1.60, 2);
    });
});