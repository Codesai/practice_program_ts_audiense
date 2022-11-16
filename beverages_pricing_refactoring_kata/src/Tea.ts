import {Beverage} from "./Beverage";

export class Tea implements Beverage {
    public price(): number {
        return 1.5;
    }
}