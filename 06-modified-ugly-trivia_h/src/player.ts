import {Tile} from "./tile";
import {Board} from "./board";
import {Referee} from './referee';
import {PlayerEvents} from "./game-events";

export class Player {
    private readonly _name: string;
    private readonly _referee: Referee;
    private readonly _board: Board;
    private readonly _playerEvents: PlayerEvents;
    private _tile: Tile;
    private _inPenaltyBox: boolean;
    private _goldCoins: number;

    constructor(name: string, referee: Referee, board: Board, playerEvents: PlayerEvents) {
        this._referee = referee;
        this._name = name;
        this._tile = board.initialTile();
        this._board = board;
        this._playerEvents = playerEvents;
        this._goldCoins = 0;
        this._inPenaltyBox = false;
    }

    play(rollNumber: number): void {
        this.roll(rollNumber);

        if (this._referee.isAnswerWrong()) {
            this.onWrongAnswer();
        } else {
            this.onCorrectAnswer(rollNumber);
        }
    }

    private onWrongAnswer(): void {
        this._playerEvents.answeredWrong();
        this.putInPenaltyBox();
    }

    private putInPenaltyBox(): void {
        this._inPenaltyBox = true;
        this._playerEvents.sentToPenaltyBox(this._name);
    }

    didWin(): boolean {
        return this._goldCoins === 6;
    }

    private roll(rollNumber: number): void {
        this._playerEvents.rolled(this._name, rollNumber);

        if (this.staysInPenaltyBox(rollNumber)) {
            this._playerEvents.couldNotGetOutOfPenaltyBox(this._name);
            return;
        }

        if (this.isGettingOutOfPenaltyBox(rollNumber)) {
            this._playerEvents.gotOutOfPenaltyBox(this._name);
        }

        this.move(rollNumber);
    }

    private move(roll: number): void {
        this.moveCurrentPlayerForward(roll);
        this.askQuestion();
    }

    private moveCurrentPlayerForward(rollNumber: number): void {
        const tile: Tile = this._tile.moveForward(this._board, rollNumber);
        this.moveTo(tile);
    }

    private onCorrectAnswer(rollNumber: number): void {
        if (this.staysInPenaltyBox(rollNumber)) {
            return;
        }
        this._playerEvents.answeredRight();
        this.earnGoldCoin();
    }

    private staysInPenaltyBox(rollNumber: number): boolean {
        return this._inPenaltyBox && !this.isGettingOutOfPenaltyBox(rollNumber);
    }

    private isGettingOutOfPenaltyBox(rollNumber: number): boolean {
        return this._inPenaltyBox && rollNumber % 2 != 0;
    }

    private moveTo(tile: Tile): void {
        this._tile = tile;
        this._playerEvents.movedTo(this._name, this._tile.asString());
    }

    private earnGoldCoin(): void {
        this._goldCoins += 1;
        this._playerEvents.earnedGoldCoin(this._name, this._goldCoins);
    }

    private askQuestion(): void {
        this._tile.askQuestion();
    }
}
