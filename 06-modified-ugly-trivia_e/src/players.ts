import {Player} from "./player";
import {Notifier} from "./notifier";
import {Position} from "./position";
import {Board} from "./board";

export class Players {
    private currentPlayerIndex: number;
    private readonly _players: Array<Player>;

    constructor(private readonly notifier: Notifier) {
        this.currentPlayerIndex = 0;
        this._players = [];
    }

    add(name: string, initialPosition: Position): void {
        this._players.push(new Player(name, this.notifier, initialPosition));

        this.notifier.notify(name + " was added");
        this.notifier.notify("They are player number " + this._players.length);
    }

    nextPlayerTurn(): void {
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this._players.length) {
            this.currentPlayerIndex = 0;
        }
    }

    currentPlayer(): Player {
        return this._players[this.currentPlayerIndex];
    }

    move(roll: number, board: Board): void {
        this.moveCurrentPlayerForward(roll, board)
        this.askQuestionToCurrentPlayer();
    }

    private moveCurrentPlayerForward(roll: number, board: Board): void {
        const newPosition = board.moveForward(this.currentPlayer().position, roll)
        this.currentPlayer().moveTo(newPosition)
    }

    private askQuestionToCurrentPlayer(): void {
        this.currentPlayer().askQuestion()
    }
}
