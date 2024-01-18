import {Notifier} from "./notifier";
import {Players} from "./players";
import {Board} from "./board";

export class Game {
    private readonly notifier: Notifier;
    private readonly players: Players;
    private isGettingOutOfPenaltyBox: boolean;
    private readonly board: Board;

    constructor(notifier: Notifier) {
        this.isGettingOutOfPenaltyBox = false
        this.players = new Players(notifier);
        this.notifier = notifier;
        this.board = Board.create(notifier)
    }

    run(): void {
        let notAWinner;
        do {
            this.roll(this.getRollNumber());

            if (this.isAnswerWrong()) {
                notAWinner = this.wrongAnswer();
            } else {
                notAWinner = this.wasCorrectlyAnswered();
            }

        } while (notAWinner);
    }

    add(name: string): void {
        this.players.add(name, this.board.initialPosition());
    }

    protected isAnswerWrong(): boolean {
        return Math.floor(Math.random() * 10) == 7;
    }

    protected getRollNumber(): number {
        return Math.floor(Math.random() * 6) + 1
    }

    private roll(roll: number): void {
        this.notifier.notify(this.getCurrentPlayerName() + " is the current player");
        this.notifier.notify("They have rolled a " + roll);

        if (this.isCurrentPlayerInPenaltyBox()) {
            if (this.isOdd(roll)) {
                this.isGettingOutOfPenaltyBox = true;
                this.notifier.notify(this.getCurrentPlayerName() + " is getting out of the penalty box");
                this.players.move(roll, this.board)
            } else {
                this.notifier.notify(this.getCurrentPlayerName() + " is not getting out of the penalty box");
                this.isGettingOutOfPenaltyBox = false;
            }
        } else {
            this.players.move(roll, this.board)
        }
    }

    private isOdd(roll: number): boolean {
        return roll % 2 != 0;
    }

    private getCurrentPlayerName(): string {
        return this.players.currentPlayer().name;
    }

    private wrongAnswer(): boolean {
        this.notifier.notify('Question was incorrectly answered');
        this.players.currentPlayer().putInPenaltyBox();
        this.nextPlayerTurn();
        return true;
    }

    private wasCorrectlyAnswered(): boolean {
        let isNotWinner = true;
        if (this.isCurrentPlayerInPenaltyBox() && this.isGettingOutOfPenaltyBox) {
            this.notifier.notify('Answer was correct!!!!');
            this.players.currentPlayer().earnGoldCoin();
            isNotWinner = this.currentPlayerDidNotWin();
        }
        if (!this.isCurrentPlayerInPenaltyBox()) {
            this.notifier.notify("Answer was correct!!!!");
            this.players.currentPlayer().earnGoldCoin();
            isNotWinner = this.currentPlayerDidNotWin();
        }
        this.nextPlayerTurn()
        return isNotWinner;
    }

    private currentPlayerDidNotWin(): boolean {
        return !(this.players.currentPlayer().didWin());
    }

    private nextPlayerTurn(): void {
        this.players.nextPlayerTurn();
    }

    private isCurrentPlayerInPenaltyBox(): boolean {
        return this.players.currentPlayer().inPenaltyBox;
    }
}
