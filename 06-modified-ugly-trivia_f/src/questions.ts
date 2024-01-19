import {Question} from "./question";
import {Notifier} from "./notifier";

export class Questions {
    private readonly _questions: Array<Question>;
    private readonly categoryName: string;
    private readonly notifier: Notifier;

    private constructor(questions: Array<Question>, categoryName: string, notifier: Notifier) {
        this.categoryName = categoryName;
        this._questions = questions;
        this.notifier = notifier;
    }

    askQuestion(): void {
        const question: Question | undefined = this._questions.shift();
        this.notifier.notify("The category is " + this.categoryName);
        question?.ask();
    }

    static generate(categoryName: string, numberOfQuestions: number, notifier: Notifier): Questions {
        let questions: Question[];
        questions = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            questions.push(new Question(`${categoryName} Question ${i}`, notifier));
        }
        return new Questions(questions, categoryName, notifier);
    }
}