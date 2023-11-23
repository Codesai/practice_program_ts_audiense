import {Player} from "./player";
import {Notifier} from "./notifier";

export class Players {
    private currentPlayerIndex: number;
    private _players: Array<Player>;

    constructor(private readonly notifier: Notifier) {
        this.currentPlayerIndex = 0;
        this._players = [];
    }

    add(name: string) {
        this._players.push(new Player(name, this.notifier));

        this.notifier.notify(name + " was added");
        this.notifier.notify("They are player number " + this._players.length);
    }

    nextPlayerTurn() {
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this._players.length) this.currentPlayerIndex = 0;
    }

    currentPlayer(): Player {
        return this._players[this.currentPlayerIndex];
    }
}