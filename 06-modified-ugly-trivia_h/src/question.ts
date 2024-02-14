import {Notifier} from './notifier';

export class Question {
    private readonly _question: string;
    private readonly _notifier: Notifier;

    constructor(question: string, notifier: Notifier) {
        this._notifier = notifier;
        this._question = question;
    }

    ask(): void {
        this._notifier.notify(this._question);
    }
}
