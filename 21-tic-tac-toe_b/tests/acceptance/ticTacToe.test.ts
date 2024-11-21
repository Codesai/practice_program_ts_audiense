import {Input} from "../../src/Input";
import {Output} from "../../src/Output";
import {TextBasedPlayer} from "../../src/TextBasedPlayer";
import {Game} from "../../src/Game";

describe("a Tic Tac Toe game on the console", () => {
    let inputX: jest.Mocked<Input>;
    let inputO: jest.Mocked<Input>;
    let outputX: jest.Mocked<Output>;
    let outputO: jest.Mocked<Output>;
    let game: Game;
    let outputXDisplayCalls: number;
    let outputODisplayCalls: number;

    beforeEach(() => {
        outputXDisplayCalls = 0;
        outputODisplayCalls = 0;
        inputX = {
            read: jest.fn(),
        };
        inputO = {
            read: jest.fn(),
        }
        outputX = {
            display: jest.fn(),
        }
        outputO = {
            display: jest.fn(),
        }

        game = new Game(new TextBasedPlayer(inputX, outputX), new TextBasedPlayer(inputO, outputO));
    });

    it("player X wins after her third turn", () => {
        inputX.read
            .mockReturnValueOnce("1")
            .mockReturnValueOnce("2")
            .mockReturnValueOnce("3");
        inputO.read
            .mockReturnValueOnce("4")
            .mockReturnValueOnce("5");

        game.start();

        expectInitialDisplay();
        expectTurnForPlayerX(
            "X | 2 | 3\n" +
            "---------\n" +
            "4 | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9"
        );
        expectTurnForPlayerO(
            "X | 2 | 3\n" +
            "---------\n" +
            "O | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9",
        );
        expectTurnForPlayerX(
            "X | X | 3\n" +
            "---------\n" +
            "O | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9",
        );
        expectTurnForPlayerO(
            "X | X | 3\n" +
            "---------\n" +
            "O | O | 6\n" +
            "---------\n" +
            "7 | 8 | 9",
        );
        expectTurnForPlayerX(
            "X | X | X\n" +
            "---------\n" +
            "O | O | 6\n" +
            "---------\n" +
            "7 | 8 | 9|n" +
            "X wins!",
        );
    });

    it("player O wins after her third turn", () => {
        inputX.read
            .mockReturnValueOnce("4")
            .mockReturnValueOnce("5")
            .mockReturnValueOnce("7");
        inputO.read
            .mockReturnValueOnce("1")
            .mockReturnValueOnce("2")
            .mockReturnValueOnce("3");

        game.start();

        expectInitialDisplay();
        expectTurnForPlayerX(
            "1 | 2 | 3\n" +
            "---------\n" +
            "X | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9",
        );
        expectTurnForPlayerO(
            "O | 2 | 3\n" +
            "---------\n" +
            "X | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9",
        );
        expectTurnForPlayerX(
            "O | 2 | 3\n" +
            "---------\n" +
            "X | X | 6\n" +
            "---------\n" +
            "7 | 8 | 9",
        );
        expectTurnForPlayerO(
            "O | O | 3\n" +
            "---------\n" +
            "X | X | 6\n" +
            "---------\n" +
            "7 | 8 | 9",
        );
        expectTurnForPlayerX(
            "O | O | 3\n" +
            "---------\n" +
            "X | X | 6\n" +
            "---------\n" +
            "X | 8 | 9",
        );
        expectTurnForPlayerO(
            "O | O | 0\n" +
            "---------\n" +
            "X | X | 6\n" +
            "---------\n" +
            "X | 8 | 9\n" +
            "O wins!",
        );
    });

    it("there is a draw when X1 → O5 → X9 → O2 → X8 → O7 → X3 → O6 → X4", () => {
        inputO.read
            .mockReturnValueOnce("1")
            .mockReturnValueOnce("9")
            .mockReturnValueOnce("8")
            .mockReturnValueOnce("8")
            .mockReturnValueOnce("3")
            .mockReturnValueOnce("4");
        inputX.read
            .mockReturnValueOnce("5")
            .mockReturnValueOnce("2")
            .mockReturnValueOnce("7")
            .mockReturnValueOnce("6");

        game.start();

        expectInitialDisplay();
        expectTurnForPlayerX(
            "X | 2 | 3\n" +
            "---------\n" +
            "4 | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9"
        );
        expectTurnForPlayerO(
            "X | 2 | 3\n" +
            "---------\n" +
            "4 | O | 6\n" +
            "---------\n" +
            "7 | 8 | 9",
        );
        expectTurnForPlayerX(
            "X | 2 | 3\n" +
            "---------\n" +
            "4 | O | 6\n" +
            "---------\n" +
            "7 | 8 | X",
        );
        expectTurnForPlayerO(
            "X | O | 3\n" +
            "---------\n" +
            "4 | O | 6\n" +
            "---------\n" +
            "7 | 8 | X",
        );
        expectTurnForPlayerX(
            "X | O | 3\n" +
            "---------\n" +
            "4 | O | 6\n" +
            "---------\n" +
            "7 | X | X",
        );
        expectTurnForPlayerO(
            "X | O | 3\n" +
            "---------\n" +
            "4 | O | 6\n" +
            "---------\n" +
            "O | X | X",
        );
        expectTurnForPlayerX(
            "X | O | X\n" +
            "---------\n" +
            "4 | O | 6\n" +
            "---------\n" +
            "O | X | X",
        );
        expectTurnForPlayerO(
            "X | O | X\n" +
            "---------\n" +
            "4 | O | O\n" +
            "---------\n" +
            "O | X | X",
        );
        expectTurnForPlayerX(
            "X | O | X\n" +
            "---------\n" +
            "X | O | O\n" +
            "---------\n" +
            "O | X | X\n" +
            "Draw!",
        );
    })

    function expectInitialDisplay(): void {
        expect(outputX.display.mock.calls[outputXDisplayCalls][0]).toEqual(
            "1 | 2 | 3\n" +
            "---------\n" +
            "4 | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9",
        );
        outputXDisplayCalls++;
    }

    function expectTurnForPlayerX(boardRepresentation: string): void {
        expect(outputX.display.mock.calls[outputXDisplayCalls][0]).toEqual("your turn...");
        expect(outputX.display.mock.calls[outputXDisplayCalls + 1][0]).toEqual(boardRepresentation);
        outputXDisplayCalls += 2;
        expect(outputO.display.mock.calls[outputODisplayCalls][0]).toEqual(boardRepresentation);
        outputODisplayCalls++;
    }

    function expectTurnForPlayerO(boardRepresentation: string): void {
        expect(outputO.display.mock.calls[outputODisplayCalls][0]).toEqual("your turn...");
        expect(outputO.display.mock.calls[outputODisplayCalls + 1][0]).toEqual(boardRepresentation);
        outputODisplayCalls += 2;
        expect(outputX.display.mock.calls[outputXDisplayCalls + 1][0]).toEqual(boardRepresentation);
        outputXDisplayCalls++;
    }
});
