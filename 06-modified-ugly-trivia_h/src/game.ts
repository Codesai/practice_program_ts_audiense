import {Players} from "./players";
import {Board} from "./board";
import {Referee} from "./referee";
import {GameEvents} from "./game-events";
import {Die} from "./Die";

export class Game {
    private readonly _players: Players;
    private readonly _referee: Referee;
    private readonly _board: Board;
    private readonly _gameEvents: GameEvents;
    private _die: Die;

    constructor(referee: Referee, board: Board, gameEvents: GameEvents, die: Die) {
        this._referee = referee;
        this._die = die;
        this._players = Players.create(gameEvents);
        this._board = board;
        this._gameEvents = gameEvents;
    }

    static create(referee: Referee,
                  gameEvents: GameEvents,
                  die: Die): Game {
        return new Game(referee, Board.create(gameEvents), gameEvents, die);
    }

    run(): void {
        do {
            this._players.playCurrentPlayer(this._die.roll());
        } while (!this._players.isThereAWinner());
    }

    add(name: string): void {
        this._players.add(name, this._referee, this._board, this._gameEvents);
    }
}
