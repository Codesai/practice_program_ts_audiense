import {PlayerInteraction} from "./PlayerInteraction";
import {Board} from "./Board";

export class Game {
    private board: Board;

    constructor(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction) {
        this.board = Board.Initial(xPlayerInteraction, oPlayerInteraction);
    }

    start(): void {
        this.showInitialMessage();
        this.startTurns();
    }

    private showInitialMessage(): void {
        this.board.showInitialMessage();
    }

    private startTurns(): void {
        while (this.board.gameGoesOn()) {
            this.board = this.board.turn();
        }
    }
}