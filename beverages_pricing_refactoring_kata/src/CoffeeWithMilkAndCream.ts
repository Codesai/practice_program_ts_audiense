import {Coffee} from "./Coffee";

export class CoffeeWithMilkAndCream extends Coffee {
    public price(): number {
        return super.price() +  0.25;
    }
}