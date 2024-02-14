import {Notifier} from "./notifier";
import {Position} from "./position";
import {Board} from "./board";
import {Referee} from './referee';

export class Player {
    private readonly _name: string;
    private readonly _notifier: Notifier;
    private readonly _referee: Referee;
    private readonly _board: Board;
    private _position: Position;
    private _inPenaltyBox: boolean;
    private _goldCoins: number;

    constructor(name: string, initialPosition: Position, notifier: Notifier, referee: Referee, board: Board) {
        this._referee = referee;
        this._notifier = notifier;
        this._name = name;
        this._position = initialPosition;
        this._board = board;
        this._goldCoins = 0;
        this._inPenaltyBox = false;
    }

    play(rollNumber: number): void {
        this.roll(rollNumber);

        if (this._referee.isAnswerWrong()) {
            this.putInPenaltyBox();
        } else {
            this.onCorrectAnswer(rollNumber);
        }
    }

    didWin(): boolean {
        return this._goldCoins === 6;
    }

    private roll(rollNumber: number): void {
        this.notifyRolling(rollNumber);

        if (this.staysInPenaltyBox(rollNumber)) {
            this._notifier.notify(this._name + " is not getting out of the penalty box");
            return;
        }

        if (this.isGettingOutOfPenaltyBox(rollNumber)) {
            this._notifier.notify(this._name + " is getting out of the penalty box");
        }

        this.move(rollNumber);
    }

    private notifyRolling(rollNumber: number): void {
        this._notifier.notify(this._name + " is the current player");
        this._notifier.notify("They have rolled a " + rollNumber);
    }

    private move(roll: number): void {
        this.moveCurrentPlayerForward(roll);
        this.askQuestion();
    }

    private moveCurrentPlayerForward(rollNumber: number): void {
        const newPosition = this._position.moveForward(this._board, rollNumber);
        this.moveTo(newPosition);
    }

    private onCorrectAnswer(rollNumber: number): void {
        if (this.staysInPenaltyBox(rollNumber)) {
            return;
        }

        this._notifier.notify('Answer was correct!!!!');
        this.earnGoldCoin();
    }

    private staysInPenaltyBox(rollNumber: number): boolean {
        return this._inPenaltyBox && !this.isGettingOutOfPenaltyBox(rollNumber);
    }

    private isGettingOutOfPenaltyBox(rollNumber: number): boolean {
        return this._inPenaltyBox && rollNumber % 2 != 0;
    }

    private moveTo(position: Position): void {
        this._position = position;
        this._notifier.notify(this._name + "'s new location is " + this._position.asString());
    }

    private earnGoldCoin(): void {
        this._goldCoins += 1;
        this._notifier.notify(this._name + " now has " + this._goldCoins + " Gold Coins.");
    }

    private putInPenaltyBox(): void {
        this._notifier.notify('Question was incorrectly answered');
        this._inPenaltyBox = true;
        this._notifier.notify(this._name + " was sent to the penalty box");
    }

    private askQuestion(): void {
        this._position.askQuestion();
    }
}
