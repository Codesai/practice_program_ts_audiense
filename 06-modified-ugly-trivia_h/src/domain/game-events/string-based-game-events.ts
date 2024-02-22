import {Notifier} from "../notifier";
import {GameEvents} from "../game-events";

export class StringBasedGameEvents implements GameEvents {
    private readonly _notifier: Notifier;

    constructor(notifier: Notifier) {
        this._notifier = notifier;
    }

    questionAsked(question: string): void {
        this._notifier.notify(question);
    }

    questionSelected(categoryName: string): void {
        this._notifier.notify("The category is " + categoryName);
    }

    couldNotGetOutOfPenaltyBox(playerName: string): void {
        this._notifier.notify(playerName + " is not getting out of the penalty box");
    }

    gotOutOfPenaltyBox(playerName: string): void {
        this._notifier.notify(playerName + " is getting out of the penalty box");
    }

    rolled(playerName: string, rollNumber: number): void {
        this._notifier.notify(playerName + " is the current player");
        this._notifier.notify("They have rolled a " + rollNumber);
    }

    answeredRight(): void {
        this._notifier.notify('Answer was correct!!!!');
    }

    answeredWrong(): void {
        this._notifier.notify('Question was incorrectly answered');
    }

    movedTo(playerName: string, tileAsString: string): void {
        this._notifier.notify(playerName + "'s new location is " + tileAsString);
    }

    earnedGoldCoin(playerName: string, goldCoins: number): void {
        this._notifier.notify(playerName + " now has " + goldCoins + " Gold Coins.");
    }

    sentToPenaltyBox(playerName: string): void {
        this._notifier.notify(playerName + " was sent to the penalty box");
    }

    addedNewPlayer(playerName: string, numberOfPlayers: number): void {
        this._notifier.notify(playerName + " was added");
        this._notifier.notify("They are player number " + numberOfPlayers);
    }
}