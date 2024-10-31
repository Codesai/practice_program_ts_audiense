import {Player} from "./player";
import {Display} from "./display";

export class Score {
    private player1Points: number;
    private player2Points: number;

    constructor(player1Points: number, player2Points: number) {
        this.player1Points = player1Points;
        this.player2Points = player2Points;
    }

    pointFor(player: Player): void {
        if (player === Player.Player1) {
            this.player1Points++;
        }

        if (player === Player.Player2) {
            this.player2Points++;
        }
    }

    show(display: Display): void {
        if (this.player1Points === 4) {
            display.displayScore("Player 1 has won!!\n\nIt was a nice game.\n\nBye now!");
        } else if (this.player2Points === 4) {
            display.displayScore("Player 2 has won!!\n\nIt was a nice game.\n\nBye now!");
        } else {
            display.displayScore(this.formatScore(this.player1Points) + " - " + this.formatScore(this.player2Points));
        }
    }

    thereIsAWinner(): boolean {
        return this.player1Points === 4 || this.player2Points === 4;
    }

    private formatScore(points: number): string {
        switch (points) {
            case 0:
                return "Love";
            case 1:
                return "Fifteen";
            case 2:
                return "Thirty";
            case 3:
                return "Forty";
        }
        return "Error";
    }
}