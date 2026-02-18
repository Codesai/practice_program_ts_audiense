import {Percentage} from "../../src/domain/orders/Percentage";

export function aPercentageOf(amount: number): Percentage {
    return new Percentage(amount);
}