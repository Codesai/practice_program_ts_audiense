import {Question} from "./question";
import {Notifier} from "./notifier";

export class Questions {
    private readonly _questions: Array<Question>;

    private constructor(questions: Array<Question>) {
        this._questions = questions;
    }

    askQuestion(): void {
        const question: Question | undefined = this._questions.shift();
        question?.ask();
    }

    static generate(categoryName: string, numberOfQuestions: number, notifier: Notifier): Questions {
        let questions: Question[];
        questions = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            questions.push(new Question(`${categoryName} Question ${i}`, notifier));
        }
        return new Questions(questions);
    }
}