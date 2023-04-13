import {Coffee} from "../src/Coffee";
import {Tea} from "../src/Tea";
import {HotChocolate} from "../src/HotChocolate";
import {TeaWithMilk} from "../src/TeaWithMilk";
import {CoffeeWithMilk} from "../src/CoffeeWithMilk";
import {CoffeeWithMilkAndCream} from "../src/CoffeeWithMilkAndCream";
import {HotChocolateWithCream} from "../src/HotChocolateWithCream";

describe('Beverage pricing', () => {

  it('computes coffee price', () => {
    const coffee = new Coffee();

    expect(coffee.price()) .toBeCloseTo(1.20, 2);
  });

  it('computes tea price', () => {
    const tea = new Tea();

    expect(tea.price()) .toBeCloseTo(1.50, 2);
  });

  it('computes hot chocolate price', () => {
    const hotChocolate = new HotChocolate();

    expect(hotChocolate.price()) .toBeCloseTo(1.45, 2);
  });

  it('computes tea with milk price', () => {
    const teaWithMilk = new TeaWithMilk();

    expect(teaWithMilk.price()) .toBeCloseTo(1.60, 2);
  });

  it('computes coffee with milk price', () => {
    const coffeeWithMilk = new CoffeeWithMilk();

    expect(coffeeWithMilk.price()) .toBeCloseTo(1.30, 2);
  });

  it('computes coffee with milk and cream price', () => {
    const coffeeWithMilkAndCream = new CoffeeWithMilkAndCream();

    expect(coffeeWithMilkAndCream.price()) .toBeCloseTo(1.45, 2);
  });

  it('computes hot chocolate with cream price', () => {
    const hotChocolateWithCream = new HotChocolateWithCream();

    expect(hotChocolateWithCream.price()).toBeCloseTo(1.60, 2);
  });
});