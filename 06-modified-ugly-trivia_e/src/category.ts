import {Notifier} from "./notifier";
import {Questions} from "./questions";

const NUMBER_OF_QUESTIONS_BY_CATEGORY: number = 50;

export class Category {
    private readonly _name: string;
    private readonly _questions: Questions;
    private readonly notifier: Notifier;

    constructor(name: string, notifier: Notifier) {
        this.notifier = notifier;
        this._name = name;
        this._questions = Questions.generate(name, NUMBER_OF_QUESTIONS_BY_CATEGORY, notifier);
    }

    askQuestion(): void {
        this.notifier.notify("The category is " + this._name);
        this._questions.askQuestion();
    }
}
