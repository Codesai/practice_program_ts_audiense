import {Beverage} from "./Beverage";

export class HotChocolate implements Beverage {
    public price(): number {
        return 1.45;
    }
}