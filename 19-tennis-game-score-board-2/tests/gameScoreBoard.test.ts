import {GameScoreBoard} from "../src/gameScoreBoard";
import {Player} from "../src/player";
import {Referee} from "../src/referee";
import {Display} from "../src/display";

describe("Game Score Board", () => {
    let referee: jest.Mocked<Referee>;
    let display: jest.Mocked<Display>;
    let gameScoreBoard: GameScoreBoard

    beforeEach(() => {
        referee = {pointWinner: jest.fn()};
        display = {displayScore: jest.fn()};
        gameScoreBoard = new GameScoreBoard(referee, display);
    })

    it.each([
        [Player.Player1, "Fifteen - Love", "Thirty - Love", "Forty - Love", announceGameWinner("Player 1")],
        [Player.Player2, "Love - Fifteen", "Love - Thirty", "Love - Forty", announceGameWinner("Player 2")]
    ])(`a player scores all points and wins the game`, (player, firstScore, secondScore, thirdScore, playerWonScore) => {
        referee.pointWinner.mockReturnValue(player);

        gameScoreBoard.startGame();

        expect(display.displayScore).toHaveBeenNthCalledWith(1, firstScore);
        expect(display.displayScore).toHaveBeenNthCalledWith(2, secondScore);
        expect(display.displayScore).toHaveBeenNthCalledWith(3, thirdScore);
        expect(display.displayScore).toHaveBeenNthCalledWith(4, playerWonScore);
    });

    it('each player wins 2 points in a row alternatively until one of them wins the game', () => {
        referee.pointWinner
            .mockReturnValueOnce(Player.Player1)
            .mockReturnValueOnce(Player.Player1)
            .mockReturnValueOnce(Player.Player2)
            .mockReturnValueOnce(Player.Player2)
            .mockReturnValueOnce(Player.Player1)
            .mockReturnValueOnce(Player.Player1)

        gameScoreBoard.startGame();

        expect(display.displayScore).toHaveBeenNthCalledWith(1, "Fifteen - Love");
        expect(display.displayScore).toHaveBeenNthCalledWith(2, "Thirty - Love");
        expect(display.displayScore).toHaveBeenNthCalledWith(3, "Thirty - Fifteen");
        expect(display.displayScore).toHaveBeenNthCalledWith(4, "Thirty - Thirty");
        expect(display.displayScore).toHaveBeenNthCalledWith(5, "Forty - Thirty");
        expect(display.displayScore).toHaveBeenNthCalledWith(6, announceGameWinner("Player 1"));
    });

    function announceGameWinner(winningPlayer: string) {
        return `${winningPlayer} has won!!\n\nIt was a nice game.\n\nBye now!`;
    }
});
