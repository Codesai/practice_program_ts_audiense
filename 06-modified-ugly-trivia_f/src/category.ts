import {Questions} from "./questions";

export class Category {
    private readonly _questions: Questions;

    constructor(questions: Questions) {
        this._questions = questions;
    }

    askQuestion(): void {
        this._questions.askQuestion();
    }
}
