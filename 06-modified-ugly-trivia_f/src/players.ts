import {Player} from "./player";
import {Notifier} from "./notifier";
import {Position} from "./position";
import {Board} from "./board";

export class Players {
    private currentPlayerIndex: number;
    private readonly _players: Array<Player>;
    private readonly notifier: Notifier;

    constructor(notifier: Notifier) {
        this.notifier = notifier;
        this.currentPlayerIndex = 0;
        this._players = [];
    }

    add(name: string, initialPosition: Position): void {
        this._players.push(new Player(name, this.notifier, initialPosition));
        this.notifyNewPlayer(name);
    }

    roll(roll: number, board: Board): void {
        return this.currentPlayer().roll(roll, board);
    }

    wasCorrectlyAnswered(rollNumber: number): boolean {
        let isNotWinner = this.currentPlayer().isNotWinner(rollNumber);
        this.nextPlayerTurn();
        return isNotWinner;
    }

    wrongAnswer(): boolean {
        this.currentPlayer().wrongAnswer();
        this.nextPlayerTurn();
        return true;
    }

    private nextPlayerTurn(): void {
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this._players.length) {
            this.currentPlayerIndex = 0;
        }
    }

    private currentPlayer(): Player {
        return this._players[this.currentPlayerIndex];
    }

    private notifyNewPlayer(name: string): void {
        this.notifier.notify(name + " was added");
        this.notifier.notify("They are player number " + this._players.length);
    }
}
