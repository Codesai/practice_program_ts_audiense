import {Die} from "../domain/die";

export class AnalogDie implements Die {
    private readonly _sides: number;

    constructor(sides: number) {
        this._sides = sides;
    }

    roll(): number {
        return Math.floor(Math.random() * this._sides) + 1;
    }
}