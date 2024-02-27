import {Board} from "./board";
import {Category} from "./category";

export class Tile {
    private readonly _position: number;
    private readonly _category: Category;

    constructor(position: number, category: Category) {
        this._position = position;
        this._category = category;
    }

    asString(): string {
        return String(this._position)
    }

    askQuestion(): void {
        this._category.askQuestion();
    }

    moveForward(board: Board, roll: number): Tile {
        return board.getTileAtPosition(this._position + roll);
    }
}
