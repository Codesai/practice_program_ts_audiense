import {Price} from "../../src/flowapowa/application/Price";

export function newPrice(amount: number): Price {
    return new Price(amount);
}
