import {Player} from "./Player";
import {GameState} from "./GameState";

export class Game {
    private readonly playerX: Player;
    private state: GameState;

    constructor(playerX: Player, playerO: Player) {
        this.playerX = playerX;
        this.state = GameState.Initial(playerX, playerO);
    }

    start(): void {
        this.showInitialMessage();
        this.startTurns();
    }

    private showInitialMessage(): void {
        this.state.showInitialMessageTo(this.playerX);
    }

    private startTurns(): void {
        while (this.state.onGoing()) {
            this.state = this.state.turn();
        }
    }
}