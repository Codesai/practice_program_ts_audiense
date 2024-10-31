import {Referee} from "./referee";
import {Display} from "./display";
import {Score} from "./score";

export class GameScoreBoard {
    constructor(private readonly referee: Referee, private readonly display: Display) {
    }

    startGame(): void {
        const score = new Score(0, 0);
        while(!score.thereIsAWinner()) {
            score.pointFor(this.referee.pointWinner());
            score.show(this.display)
        }

    }
}