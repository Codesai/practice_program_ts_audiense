import {QuestionEvents} from "./game-events";

export class Question {
    private readonly _question: string;
    private readonly _questionEvents: QuestionEvents;

    constructor(question: string, questionEvents: QuestionEvents) {
        this._question = question;
        this._questionEvents = questionEvents;
    }

    ask(): void {
        this._questionEvents.questionAsked(this._question);
    }
}
