import { Board } from './board';
import { Notifier } from './notifier';
import { Players } from './players';

export const POP_CATEGORY = 'Pop';
export const SCIENCE_CATEGORY = 'Science';
export const SPORTS_CATEGORY = 'Sports';
export const ROCK_CATEGORY = 'Rock';

export class Game {
  private notifier: Notifier;
  private players: Players;
  private board: Board;
  private isGettingOutOfPenaltyBox: boolean = false;

  constructor(notifier: Notifier) {
    this.notifier = notifier;
    this.board = new Board(notifier);
    this.players = new Players(notifier);
  }

  public run(): void {
    let notAWinner;
    do {
      this.play(this.roll());

      if (this.isAnswerWrong()) {
        notAWinner = this.wrongAnswer();
      } else {
        notAWinner = this.wasCorrectlyAnswered();
      }
    } while (notAWinner);
  }

  public add(name: string): boolean {
    this.players.add(name, this.board.positions[0]);
    return true;
  }

  protected isAnswerWrong(): boolean {
    return Math.floor(Math.random() * 10) == 7;
  }

  protected roll(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  private play(roll: number) {
    this.notifier.notify(this.getCurrentPlayerName() + ' is the current player');
    this.notifier.notify('They have rolled a ' + roll);

    if (this.isCurrentPlayerInPenaltyBox()) {
      if (this.isOdd(roll)) {
        this.isGettingOutOfPenaltyBox = true;
        this.notifier.notify(this.getCurrentPlayerName() + ' is getting out of the penalty box');
        this.players.moveAndAskQuestion(this.board, roll);
      } else {
        this.notifier.notify(this.getCurrentPlayerName() + ' is not getting out of the penalty box');
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.players.moveAndAskQuestion(this.board, roll);
    }
  }

  private isOdd(roll: number) {
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
    if (!this.isCurrentPlayerInPenaltyBox() || this.isGettingOutOfPenaltyBox) {
      this.notifier.notify('Answer was correct!!!!');
      this.players.currentPlayer().earnGoldCoin();
      isNotWinner = this.currentPlayerDidNotWin();
    }
    this.nextPlayerTurn();
    return isNotWinner;
  }

  private currentPlayerDidNotWin() {
    return !this.players.currentPlayer().didWin();
  }

  private nextPlayerTurn() {
    this.players.nextPlayerTurn();
  }

  private isCurrentPlayerInPenaltyBox() {
    return this.players.currentPlayer().inPenaltyBox;
  }
}
