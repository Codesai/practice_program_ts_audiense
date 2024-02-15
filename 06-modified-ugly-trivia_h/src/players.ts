import {Player} from "./player";
import {Board} from "./board";
import {Referee} from './referee';
import {PlayerEvents, PlayersEvents} from "./game-events";

export class Players {
    private readonly _players: Array<Player>;
    private readonly _playersEvents: PlayersEvents;
    private _currentPlayerIndex: number;
    private _thereIsAWinner: boolean;

    constructor(playersEvents: PlayersEvents) {
        this._playersEvents = playersEvents;
        this._currentPlayerIndex = 0;
        this._players = [];
        this._thereIsAWinner = false;
    }

    static create(playersEvents: PlayersEvents): Players {
        return new Players(playersEvents)
    }

    playCurrentPlayer(rollNumber: number): void {
        this.currentPlayer().play(rollNumber);
        this._thereIsAWinner = this.currentPlayer().didWin();
        this.nextPlayerTurn();
    }

    add(name: string, referee: Referee, board: Board, playerEvents: PlayerEvents): void {
        this._players.push(new Player(name, referee, board, playerEvents));
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
        this._playersEvents.addedNewPlayer(name, this._players.length)
    }
}
