import {Coffee} from "./Coffee";

export class CoffeeWithMilk extends Coffee {
    public price(): number {
        return super.price() +  0.10;
    }
}