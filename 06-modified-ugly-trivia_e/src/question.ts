import {Notifier} from './notifier';

export class Question {
    private readonly _question: string;
    private readonly notifier: Notifier;

    constructor(question: string, notifier: Notifier) {
        this.notifier = notifier;
        this._question = question;
    }

    ask(): void {
        this.notifier.notify(this._question);
    }
}
