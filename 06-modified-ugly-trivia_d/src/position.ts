import { Category } from './category';

export class Position {
  constructor(private _category: Category, private _index: number) {}

  askQuestion() {
    this._category.askQuestion();
  }

  get index() {
    return this._index;
  }

  get category() {
    return this._category;
  }
}
