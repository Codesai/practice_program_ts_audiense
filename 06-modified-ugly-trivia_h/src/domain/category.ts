import {Question} from "./question";
import {AskingQuestionsEvents, CategoryEvents} from "./game-events";

export class Category {
    private readonly _questions: Array<Question>;
    private readonly _name: string;
    private readonly _categoryEvents: CategoryEvents;

    constructor(questions: Array<Question>, name: string, categoryEvents: CategoryEvents) {
        this._name = name;
        this._questions = questions;
        this._categoryEvents = categoryEvents;
    }

    askQuestion(): void {
        const question = this.selectQuestion();
        question?.ask();
    }

    private selectQuestion(): Question | undefined {
        const question: Question | undefined = this._questions.shift();
        this._categoryEvents.questionSelected(this._name);
        return question;
    }

    static generate(name: string, numberOfQuestions: number, askingQuestionsEvents: AskingQuestionsEvents): Category {
        let questions: Question[];
        questions = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            questions.push(new Question(`${name} Question ${i}`, askingQuestionsEvents));
        }
        return new Category(questions, name, askingQuestionsEvents);
    }
}