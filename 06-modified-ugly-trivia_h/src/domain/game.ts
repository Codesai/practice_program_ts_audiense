import {Players} from "./players";
import {Board} from "./board";
import {Referee} from "./referee";
import {GameEvents} from "./game-events";
import {Die} from "./die";

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
            this.playCurrentPlayer();
        } while (this.gameContinues());
    }

    add(name: string): void {
        this._players.add(name, this._referee, this._board, this._gameEvents);
    }

    private gameContinues(): boolean {
        return !this._players.isThereAWinner();
    }

    private playCurrentPlayer(): void {
        const rollNumber: number = this._die.roll();
        this._players.playCurrentPlayer(rollNumber);
    }
}
