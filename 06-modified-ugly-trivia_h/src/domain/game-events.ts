export interface PlayerEvents {
    couldNotGetOutOfPenaltyBox(playerName: string): void;

    gotOutOfPenaltyBox(playerName: string): void;

    rolled(playerName: string, rollNumber: number): void;

    answeredRight(): void;

    answeredWrong(): void;

    movedTo(playerName: string, tileAsString: string): void;

    earnedGoldCoin(playerName: string, goldCoins: number): void;

    sentToPenaltyBox(playerName: string): void;
}

export interface CategoryEvents {
    questionSelected(categoryName: string): void;
}

export interface QuestionEvents {
    questionAsked(question: string): void;
}

export interface PlayersEvents {
    addedNewPlayer(playerName: string, numberOfPlayers: number): void;
}

export interface AskingQuestionsEvents extends QuestionEvents, CategoryEvents {
}

export interface GameEvents extends PlayerEvents, AskingQuestionsEvents, PlayersEvents {
}
