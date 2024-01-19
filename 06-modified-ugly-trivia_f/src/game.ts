import {Notifier} from "./notifier";
import {Players} from "./players";
import {Board} from "./board";
import {Referee} from "./referee";

export class Game {
    private readonly players: Players;
    private readonly board: Board;
    private readonly referee: Referee;

    protected constructor(notifier: Notifier, referee: Referee, board: Board) {
        this.players = new Players(notifier);
        this.board = board
        this.referee = referee;
    }

    static create(notifier: Notifier, referee: Referee): Game {
        return new Game(notifier, referee, Board.create(notifier));
    }

    run(): void {
        let notAWinner;
        do {
            const rollNumber = this.getRollNumber();
            this.players.roll(rollNumber, this.board);

            if (this.isAnswerWrong()) {
                notAWinner = this.players.wrongAnswer();
            } else {
                notAWinner = this.players.wasCorrectlyAnswered(rollNumber);
            }

        } while (notAWinner);
    }

    add(name: string): void {
        this.players.add(name, this.board.initialPosition());
    }

    private isAnswerWrong(): boolean {
        return this.referee.isAnswerWrong();
    }

    protected getRollNumber(): number {
        return Math.floor(Math.random() * 6) + 1
    }
}
