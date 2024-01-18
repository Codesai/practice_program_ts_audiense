import {Notifier} from "./notifier";
import {Position} from "./position";

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

    get goldCoins(): number {
        return this._goldCoins;
    }

    get position(): Position {
        return this._position;
    }

    get inPenaltyBox(): boolean {
        return this._inPenaltyBox;
    }

    moveTo(position: Position) {
        this._position = position;
        this.notifier.notify(this.name + "'s new location is " + this._position.number);
    }

    earnGoldCoin() {
        this._goldCoins += 1;
        this.notifier.notify(this.name + " now has " + this.goldCoins + " Gold Coins.");
    }

    putInPenaltyBox() {
        this._inPenaltyBox = true;
        this.notifier.notify(this.name + " was sent to the penalty box");
    }

    didWin(): boolean {
        return this._goldCoins === 6;
    }

    askQuestion() {
        this._position.askQuestion();
    }
}
