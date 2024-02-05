import {Notifier} from "./notifier";
import {Players} from "./players";
import {Board} from "./board";
import {Referee} from "./referee";

export class Game {
    private readonly _players: Players;
    private readonly _referee: Referee;
    private readonly _board: Board;

    protected constructor(notifier: Notifier, referee: Referee, board: Board) {
        this._referee = referee;
        this._players = new Players(notifier);
        this._board = board;
    }

    static create(notifier: Notifier, referee: Referee): Game {
        return new Game(notifier, referee, Board.create(notifier));
    }

    run(): void {
        do {
            const rollNumber = this.getRollNumber();
            this._players.playCurrentPlayer(rollNumber);
        } while (!this._players.isThereAWinner());
    }

    add(name: string): void {
        this._players.add(name, this._board.initialPosition(), this._referee, this._board);
    }

    protected getRollNumber(): number {
        return Math.floor(Math.random() * 6) + 1;
    }
}
