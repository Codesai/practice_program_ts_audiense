import {Question} from "./question";
import {Notifier} from "./notifier";

export class Category {
    private readonly _questions: Array<Question>;
    private readonly _name: string;
    private readonly _notifier: Notifier;

    private constructor(questions: Array<Question>, name: string, notifier: Notifier) {
        this._name = name;
        this._questions = questions;
        this._notifier = notifier;
    }

    askQuestion(): void {
        const question: Question | undefined = this._questions.shift();
        this._notifier.notify("The category is " + this._name);
        question?.ask();
    }

    static generate(name: string, numberOfQuestions: number, notifier: Notifier): Category {
        let questions: Question[];
        questions = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            questions.push(new Question(`${name} Question ${i}`, notifier));
        }
        return new Category(questions, name, notifier);
    }
}