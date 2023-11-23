import { Notifier } from './notifier';

export class Question {
  private _question: string;

  constructor(question: string) {
    this._question = question;
  }

  get question() {
    return this._question;
  }

  answerIsCorrect(answer: number) {
    return answer !== 7;
  }

  notify(notifier: Notifier) {
    notifier.notify(this._question);
  }
}
