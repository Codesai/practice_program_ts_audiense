import {Category} from "./category";

export class Position {
    private _category: Category;
    _number: number;

    constructor(category: Category, number: number) {
        this._number = number;
        this._category = category;
    }

    askQuestion(): void {
        this._category.askQuestion()
    }
}
