import {PlayerInteraction} from "./PlayerInteraction";
import {Turn} from "./Turn";

export class Game {
    private turn: Turn;

    constructor(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction) {
        this.turn = Turn.Initial(xPlayerInteraction, oPlayerInteraction);
    }

    start(): void {
        this.turn.showInitialMessage();
        this.playTurns();
    }
    private playTurns(): void {
        while (this.turn.thereIsNext()) {
            this.turn = this.turn.play();
        }
    }
}