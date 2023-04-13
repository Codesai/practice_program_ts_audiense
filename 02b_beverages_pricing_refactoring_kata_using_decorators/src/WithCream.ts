import {Beverage} from "./Beverage";

export class WithCream implements Beverage{
    private beverage: Beverage;

    constructor(beverage: Beverage) {
        this.beverage = beverage;
    }

    price(): number {
        return this.beverage.price() + 0.15;
    }

}