import {Notifier} from "./notifier";

export class Player {
    readonly name: string;
    private _position: number;
    private _inPenaltyBox: boolean;
    private _goldCoins: number;

    constructor(name: string, private readonly notifier: Notifier) {
        this.name = name;
        this._position = 0;
        this._goldCoins = 0;
        this._inPenaltyBox = false;
    }

    get goldCoins(): number {
        return this._goldCoins;
    }

    get position(): number {
        return this._position;
    }

    get inPenaltyBox(): boolean {
        return this._inPenaltyBox;
    }

    moveForward(position: number) {
        this._position = position;

        this.notifier.notify(this.name + "'s new location is " + this.position);
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
}