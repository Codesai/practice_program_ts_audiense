import { Position } from './Position';
import { Board } from './board';
import { Notifier } from './notifier';

export class Player {
  readonly name: string;
  private _position: Position;
  private _inPenaltyBox: boolean;
  private _goldCoins: number;

  constructor(name: string, private readonly notifier: Notifier, position: Position) {
    this.name = name;
    this._goldCoins = 0;
    this._inPenaltyBox = false;
    this._position = position;
  }

  get inPenaltyBox(): boolean {
    return this._inPenaltyBox;
  }

  earnGoldCoin() {
    this._goldCoins += 1;
    this.notifier.notify(this.name + ' now has ' + this._goldCoins + ' Gold Coins.');
  }

  putInPenaltyBox() {
    this._inPenaltyBox = true;
    this.notifier.notify(this.name + ' was sent to the penalty box');
  }

  didWin(): boolean {
    return this._goldCoins === 6;
  }

  moveAndAskQuestion(board: Board, roll: number) {
    const newPosition = this.nextPosition(board, roll);
    this.moveForwardTo(newPosition);
    this.askQuestion();
  }

  private askQuestion() {
    this._position.askQuestion();
  }

  private nextPosition(board: Board, roll: number) {
    return board.moveForward(this._position.index, roll);
  }

  private moveForwardTo(position: Position) {
    this._position = position;
    this.notifier.notify(this.name + "'s new location is " + this._position.index);
  }
}
