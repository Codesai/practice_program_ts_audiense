import {Category} from "./category";

export class Position {
    private category: Category;
    number: number;

    constructor(category: Category, number: number) {
        this.number = number;
        this.category = category;
    }

    askQuestion(): void {
        this.category.askQuestion()
    }
}
