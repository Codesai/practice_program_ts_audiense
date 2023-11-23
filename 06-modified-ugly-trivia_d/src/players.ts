import { Player } from './player';
import { Notifier } from './notifier';
import { Position } from './Position';
import { Board } from './board';

export class Players {
  private currentPlayerIndex: number;
  private _players: Array<Player>;

  constructor(private readonly notifier: Notifier) {
    this.currentPlayerIndex = 0;
    this._players = [];
  }

  add(name: string, initialPosition: Position) {
    this._players.push(new Player(name, this.notifier, initialPosition));

    this.notifier.notify(name + ' was added');
    this.notifier.notify('They are player number ' + this._players.length);
  }

  nextPlayerTurn() {
    this.currentPlayerIndex += 1;
    if (this.currentPlayerIndex == this._players.length) this.currentPlayerIndex = 0;
  }

  currentPlayer(): Player {
    return this._players[this.currentPlayerIndex];
  }

  moveAndAskQuestion(board: Board, roll: number) {
    this.currentPlayer().moveAndAskQuestion(board, roll);
  }
}
