import {Notifier} from "./notifier";
import {Position} from "./position";
import {Board} from "./board";

export class Player {
    readonly name: string;
    private _position: Position;
    private _inPenaltyBox: boolean;
    private _goldCoins: number;

    constructor(name: string, private readonly notifier: Notifier, initialPosition: Position) {
        this.name = name;
        this._position = initialPosition;
        this._goldCoins = 0;
        this._inPenaltyBox = false;
    }

    roll(roll: number, board: Board): void {
        this.notifier.notify(this.name + " is the current player");
        this.notifier.notify("They have rolled a " + roll);

        if (this._inPenaltyBox) {
            if (this.isGettingOutOfPenaltyBox(roll)) {
                this.notifier.notify(this.name + " is getting out of the penalty box");
                this.move(roll, board)
            } else {
                this.notifier.notify(this.name + " is not getting out of the penalty box");
            }
        } else {
            this.move(roll, board)
        }
    }

    isNotWinner(rollNumber: number): boolean {
        let isNotWinner = true;
        if (this._inPenaltyBox && this.isGettingOutOfPenaltyBox(rollNumber)) {
            this.notifier.notify('Answer was correct!!!!');
            this.earnGoldCoin();
            isNotWinner = !(this.didWin());
        }
        if (!this._inPenaltyBox) {
            this.notifier.notify("Answer was correct!!!!");
            this.earnGoldCoin();
            isNotWinner = !(this.didWin());
        }
        return isNotWinner;
    }

    wrongAnswer() {
        this.notifier.notify('Question was incorrectly answered');
        this.putInPenaltyBox();
    }

    private move(roll: number, board: Board): void {
        this.moveCurrentPlayerForward(roll, board)
        this.askQuestion()
    }

    private moveCurrentPlayerForward(roll: number, board: Board): void {
        const newPosition = board.moveForward(this._position, roll)
        this.moveTo(newPosition)
    }

    private isGettingOutOfPenaltyBox(roll: number): boolean {
        return roll % 2 != 0;
    }

    private moveTo(position: Position): void {
        this._position = position;
        this.notifier.notify(this.name + "'s new location is " + this._position.number);
    }

    private earnGoldCoin(): void {
        this._goldCoins += 1;
        this.notifier.notify(this.name + " now has " + this._goldCoins + " Gold Coins.");
    }

    private putInPenaltyBox(): void {
        this._inPenaltyBox = true;
        this.notifier.notify(this.name + " was sent to the penalty box");
    }

    private didWin(): boolean {
        return this._goldCoins === 6;
    }

    private askQuestion(): void {
        this._position.askQuestion();
    }
}
