import {Notifier} from "./notifier";
import {Players} from "./players";
import {Category} from "./category";

const POP_CATEGORY = 'Pop';
const SCIENCE_CATEGORY = 'Science';
const SPORTS_CATEGORY = 'Sports';
const ROCK_CATEGORY = 'Rock';

class Position {
    constructor(private category: Category) {}

    askQuestion() {
        this.category.askQuestion()
    }
}

export class Game {
    private notifier: Notifier;
    private players: Players;
    private isGettingOutOfPenaltyBox: boolean = false;
    private categories: Record<string, Category>;
    private readonly boardSize = 12;
    private positions: Position[]

    constructor(notifier: Notifier) {
        this.categories = {
            [POP_CATEGORY]: new Category(POP_CATEGORY, notifier),
            [SCIENCE_CATEGORY]: new Category(SCIENCE_CATEGORY, notifier),
            [SPORTS_CATEGORY]: new Category(SPORTS_CATEGORY, notifier),
            [ROCK_CATEGORY]: new Category(ROCK_CATEGORY, notifier),
        }
        this.notifier = notifier;
        this.positions = []
        this.players = new Players(notifier);
        for (let i = 0; i < this.boardSize; i++) {
            const currentCategory = this.currentCategory2(i)
            this.positions.push(new Position( this.categories[currentCategory]))
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
        this.players.add(name);

        return true;
    }

    protected isAnswerWrong(): boolean {
        return Math.floor(Math.random() * 10) == 7;
    }

    protected getRollNumber(): number {
        return Math.floor(Math.random() * 6) + 1
    }

    private roll(roll: number) {
        this.notifier.notify(this.getCurrentPlayerName() + " is the current player");
        this.notifier.notify("They have rolled a " + roll);

        if (this.isCurrentPlayerInPenaltyBox()) {
            if (this.isOdd(roll)) {
                this.isGettingOutOfPenaltyBox = true;
                this.notifier.notify(this.getCurrentPlayerName() + " is getting out of the penalty box");
                this.moveForward(roll, this.boardSize);
                this.notifier.notify("The category is " + this.currentCategory());
                this.askQuestion();
            } else {
                this.notifier.notify(this.getCurrentPlayerName() + " is not getting out of the penalty box");
                this.isGettingOutOfPenaltyBox = false;
            }
        } else {
            this.moveForward(roll, this.boardSize);
            this.notifier.notify("The category is " + this.currentCategory());
            this.askQuestion();
        }
    }

    private isOdd(roll: number) {
        return roll % 2 != 0;
    }

    private getCurrentPlayerName(): string {
        return this.players.currentPlayer().name;
    }
    private getCurrentPlayerPosition() {
        return this.players.currentPlayer().position;
    }

    private askQuestion(): void {
        const currentCategory = this.currentCategory();
        this.categories[currentCategory].askQuestion()
    }

    private askQuestion2(): void {
        const currentPosition = this.positions[this.getCurrentPlayerPosition()];
        currentPosition.askQuestion()
    }

    moveForward(roll: number, boardSize: number) {
        let newPosition = this.getCurrentPlayerPosition() + roll;
        if (newPosition >= boardSize) {
            newPosition = newPosition - boardSize;
        }

        this.players.currentPlayer().moveForward(newPosition);
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

    private currentCategory2(positionNumber: number): string {
        if (positionNumber == 0) return POP_CATEGORY;
        if (positionNumber == 4) return POP_CATEGORY;
        if (positionNumber == 8) return POP_CATEGORY;
        if (positionNumber == 1) return SCIENCE_CATEGORY;
        if (positionNumber == 5) return SCIENCE_CATEGORY;
        if (positionNumber == 9) return SCIENCE_CATEGORY;
        if (positionNumber == 2) return SPORTS_CATEGORY;
        if (positionNumber == 6) return SPORTS_CATEGORY;
        if (positionNumber == 10) return SPORTS_CATEGORY;
        return ROCK_CATEGORY;
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

    private currentPlayerDidNotWin() {
        return !(this.players.currentPlayer().didWin());
    }

    private nextPlayerTurn() {
        this.players.nextPlayerTurn();
    }

    private isCurrentPlayerInPenaltyBox() {
        return this.players.currentPlayer().inPenaltyBox;
    }
}
