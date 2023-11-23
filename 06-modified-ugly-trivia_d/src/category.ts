import {Notifier} from "./notifier";

export class Category {
    _name: string
    _questions: Array<string>

    constructor(name: string, private readonly notifier: Notifier) {
        this._name = name
        this._questions = [];
        for (let i = 0; i < 50; i++) {
            this._questions.push(`${name} Question ${i}`);
        }
    }

    askQuestion(): void {
        this.notifier.notify(this._questions.shift());
    }

    get name(): string {
        return this._name
    }
}