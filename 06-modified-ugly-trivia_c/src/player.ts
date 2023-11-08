export class Player {
    readonly name: string;
    private _position: number;
    private _inPenaltyBox: boolean;
    private _goldCoins: number;

    constructor(name: string) {
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

    moveForward(roll: number, boardSize: number) {
        this._position = this._position + roll;
        if (this._position >= boardSize) {
            this._position = this._position - boardSize;
        }
    }

    earnGoldCoin() {
        this._goldCoins += 1;
    }

    putInPenaltyBox() {
        this._inPenaltyBox = true;
    }

    didWin(): boolean {
        return this._goldCoins === 6;
    }
}