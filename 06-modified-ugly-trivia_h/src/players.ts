import {Player} from "./player";
import {Notifier} from "./notifier";
import {Position} from "./position";
import {Board} from "./board";
import {Referee} from './referee';

export class Players {
    private readonly _players: Array<Player>;
    private readonly _notifier: Notifier;
    private _currentPlayerIndex: number;
    private _thereIsAWinner: boolean;

    constructor(notifier: Notifier) {
        this._notifier = notifier;
        this._currentPlayerIndex = 0;
        this._players = [];
        this._thereIsAWinner = false;
    }

    playCurrentPlayer(rollNumber: number): void {
        this.currentPlayer().play(rollNumber);
        this._thereIsAWinner = this.currentPlayer().didWin();
        this.nextPlayerTurn();
    }

    add(name: string, initialPosition: Position, referee: Referee, board: Board): void {
        this._players.push(new Player(name, initialPosition, this._notifier, referee, board));
        this.notifyNewPlayer(name);
    }

    isThereAWinner(): boolean {
        return this._thereIsAWinner;
    }

    private nextPlayerTurn(): void {
        this._currentPlayerIndex += 1;
        if (this._currentPlayerIndex == this._players.length) {
            this._currentPlayerIndex = 0;
        }
    }

    private currentPlayer(): Player {
        return this._players[this._currentPlayerIndex];
    }

    private notifyNewPlayer(name: string): void {
        this._notifier.notify(name + " was added");
        this._notifier.notify("They are player number " + this._players.length);
    }
}
