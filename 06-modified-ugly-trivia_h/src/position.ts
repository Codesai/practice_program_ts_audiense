import {Board} from "./board";
import {Category} from "./category";

export class Position {
    private readonly _number: number;
    private readonly _category: Category;

    constructor(number: number, category: Category) {
        this._number = number;
        this._category = category;
    }

    asString(): string {
        return String(this._number)
    }

    askQuestion(): void {
        this._category.askQuestion();
    }

    moveForward(board: Board, roll: number): Position {
        return board.getPositionInside(this._number + roll);
    }
}
