import {Category} from "./category";

export class Position {
    constructor(private category: Category, public number: number) {
    }

    askQuestion(): void {
        this.category.askQuestion()
    }
}
