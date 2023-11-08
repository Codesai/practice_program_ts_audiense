import {Notifier} from "./notifier";
import {Player} from "./player";

const POP_CATEGORY = 'Pop';
const SCIENCE_CATEGORY = 'Science';
const SPORTS_CATEGORY = 'Sports';
const ROCK_CATEGORY = 'Rock';

export class Game {

    private notifier: Notifier;

    private players: Array<Player> = []
    private currentPlayer: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;
    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];
    private readonly boardSize = 12;

    constructor(notifier: Notifier) {
        this.notifier = notifier;

        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push(this.createRockQuestion(i));
          }
    }

    public run(): void {
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

    public add(name: string): boolean {
        this.players.push(new Player(name));

        this.notifier.notify(name + " was added");
        this.notifier.notify("They are player number " + this.getNumberOfPlayers());

        return true;
    }

    protected isAnswerWrong(): boolean {
        return Math.floor(Math.random() * 10) == 7;
    }

    protected getRollNumber(): number {
        return Math.floor(Math.random() * 6) + 1
    }

    private createRockQuestion(index: number): string {
        return "Rock Question " + index;
    }
    
    private roll(roll: number) {
        this.notifier.notify(this.getCurrentPlayerName() + " is the current player");
        this.notifier.notify("They have rolled a " + roll);

        if (this.isCurrentPlayerInPenaltyBox()) {
            if (this.isOdd(roll)) {
                this.isGettingOutOfPenaltyBox = true;
                this.notifier.notify(this.getCurrentPlayerName() + " is getting out of the penalty box");
                this.moveForward(roll);
                this.notifier.notify("The category is " + this.currentCategory());
                this.askQuestion();
            } else {
                this.notifier.notify(this.getCurrentPlayerName() + " is not getting out of the penalty box");
                this.isGettingOutOfPenaltyBox = false;
            }
        } else {
            this.moveForward(roll)
            this.notifier.notify("The category is " + this.currentCategory());
            this.askQuestion();
        }
    }

    private isOdd(roll: number) {
        return roll % 2 != 0;
    }

    private getCurrentPlayerName(): string {
        return this.getCurrentPlayer().name;
    }

    private getCurrentPlayer(): Player {
        return this.players[this.currentPlayer];
    }

    private moveForward(roll: number) {
        this.getCurrentPlayer().moveForward(roll, this.boardSize);
        this.notifier.notify(this.getCurrentPlayerName() + "'s new location is " + this.getCurrentPlayerPosition());
    }

    private getCurrentPlayerPosition() {
        return this.getCurrentPlayer().position;
    }

    private askQuestion(): void {
        const currentCategory = this.currentCategory();
        if (currentCategory == POP_CATEGORY) this.notifier.notify(this.popQuestions.shift());
        if (currentCategory == SCIENCE_CATEGORY) this.notifier.notify(this.scienceQuestions.shift());
        if (currentCategory == SPORTS_CATEGORY) this.notifier.notify(this.sportsQuestions.shift());
        if (currentCategory == ROCK_CATEGORY) this.notifier.notify(this.rockQuestions.shift());
    }

    private currentCategory(): string {
        const currentPlayerPosition = this.getCurrentPlayerPosition();
        if (currentPlayerPosition == 0) return POP_CATEGORY;
        if (currentPlayerPosition == 4) return POP_CATEGORY;
        if (currentPlayerPosition == 8) return POP_CATEGORY;
        if (currentPlayerPosition == 1) return SCIENCE_CATEGORY;
        if (currentPlayerPosition == 5) return SCIENCE_CATEGORY;
        if (currentPlayerPosition == 9) return SCIENCE_CATEGORY;
        if (currentPlayerPosition == 2) return SPORTS_CATEGORY;
        if (currentPlayerPosition == 6) return SPORTS_CATEGORY;
        if (currentPlayerPosition == 10) return SPORTS_CATEGORY;
        return ROCK_CATEGORY;
    }

    private wrongAnswer(): boolean {
        this.notifier.notify('Question was incorrectly answered');
        this.sendCurrentPlayerIntoPenaltyBox();
        this.nextPlayerTurn();
        return true;
    }

    private sendCurrentPlayerIntoPenaltyBox() {
        this.notifier.notify(this.getCurrentPlayerName() + " was sent to the penalty box");
        this.getCurrentPlayer().putInPenaltyBox();
    }

    private wasCorrectlyAnswered(): boolean {
        let isNotWinner = true;
        if (this.isCurrentPlayerInPenaltyBox() && this.isGettingOutOfPenaltyBox) {
            this.notifier.notify('Answer was correct!!!!');
            this.currentPlayerEarnsGoldCoin();
            isNotWinner = this.currentPlayerDidNotWin();
        }
        if (!this.isCurrentPlayerInPenaltyBox()) {
            this.notifier.notify("Answer was correct!!!!");
            this.currentPlayerEarnsGoldCoin();
            isNotWinner = this.currentPlayerDidNotWin();
        }
        this.nextPlayerTurn()
        return isNotWinner;
    }

    private currentPlayerDidNotWin() {
        return !(this.getCurrentPlayer().didWin());
    }

    private nextPlayerTurn() {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.getNumberOfPlayers()) this.currentPlayer = 0;
    }

    private getNumberOfPlayers() {
        return this.players.length;
    }

    private currentPlayerEarnsGoldCoin() {
        this.getCurrentPlayer().earnGoldCoin();
        this.notifier.notify(this.getCurrentPlayerName() + " now has " + this.getCurrentPlayer().goldCoins + " Gold Coins.");
    }

    private isCurrentPlayerInPenaltyBox() {
        return this.getCurrentPlayer().inPenaltyBox;
    }
}
