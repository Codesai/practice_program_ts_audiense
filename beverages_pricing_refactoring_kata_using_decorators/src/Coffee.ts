import {Beverage} from "./Beverage";

export class Coffee implements Beverage {
    public price(): number {
        return 1.2;
    }
}