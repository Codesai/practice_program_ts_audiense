import {PlayerInteraction} from "./PlayerInteraction";
import {GameState} from "./GameState";

export class Game {
    private readonly xPlayerInteraction: PlayerInteraction;
    private state: GameState;

    constructor(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction) {
        this.xPlayerInteraction = xPlayerInteraction;
        this.state = GameState.Initial(xPlayerInteraction, oPlayerInteraction);
    }

    start(): void {
        this.showInitialMessage();
        this.startTurns();
    }

    private showInitialMessage(): void {
        this.state.showInitialMessageTo(this.xPlayerInteraction);
    }

    private startTurns(): void {
        while (this.state.onGoing()) {
            this.state = this.state.turn();
        }
    }
}