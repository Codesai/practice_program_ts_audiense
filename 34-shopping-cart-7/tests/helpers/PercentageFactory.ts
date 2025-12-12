import {Percentage} from "../../src/domain/Percentage";

export function aPercentageOf(amount: number): Percentage {
    return new Percentage(amount);
}