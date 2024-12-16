import {Input} from "../../src/infrastructure/Input";
import {Output} from "../../src/infrastructure/Output";
import {Field} from "../../src/app/Field";
import {aGameStateDto, initialGameStateDto} from "../helpers/GameStateDtoBuilder";
import {TextBasedPlayerInteraction} from "../../src/infrastructure/TextBasedPlayerInteraction";

describe('text based player interaction', () => {
    let input: jest.Mocked<Input>;
    let output: jest.Mocked<Output>;
    let playerInteraction: TextBasedPlayerInteraction;

    beforeEach(() => {
        input = {
            read: jest.fn(),
        };
        output = {
            display: jest.fn(),
        }
        playerInteraction = new TextBasedPlayerInteraction(input, output);
    });

    describe('the interaction in the player\'s turn', () => {
        it.each([
            ["1", Field.One],
            ["2", Field.Two],
            ["3", Field.Three],
            ["4", Field.Four],
            ["5", Field.Five],
            ["6", Field.Six],
            ["7", Field.Seven],
            ["8", Field.Eight],
            ["9", Field.Nine],
        ])('maps the user input into a valid field', (userInput: string, expectedField: Field) => {
            input.read.mockReturnValueOnce(userInput);

            const field = playerInteraction.yourTurn();

            expect(field).toEqual(expectedField);
            expect(output.display.mock.calls[0][0]).toEqual("your turn...");
        });

        it('retries until the player enters a valid field', () => {
            input.read.mockReturnValueOnce("Invalid value").mockReturnValueOnce("1");

            const field = playerInteraction.yourTurn();

            expect(field).toEqual(Field.One);
            expect(output.display.mock.calls[0][0]).toEqual("your turn...");
            expect(output.display.mock.calls[1][0]).toEqual("invalid input, please try again");
        });
    });

    describe('the interaction displays to the player', () => {
        it('the initial game state', () => {
            const gameDto = initialGameStateDto();

            playerInteraction.display(gameDto);

            expect(output.display.mock.calls[0][0]).toEqual(
                "1 | 2 | 3\n" +
                "---------\n" +
                "4 | 5 | 6\n" +
                "---------\n" +
                "7 | 8 | 9\n",
            );
        });

        it('the game state after X picks field 1', () => {
            const gameStateDto = aGameStateDto().withFieldsWithX(Field.One).build();

            playerInteraction.display(gameStateDto);

            expect(output.display.mock.calls[0][0]).toEqual(
                "X | 2 | 3\n" +
                "---------\n" +
                "4 | 5 | 6\n" +
                "---------\n" +
                "7 | 8 | 9\n",
            );
        });

        it('the game state after O picks field 3', () => {
            const gameStateDto = aGameStateDto().withFieldsWithO(Field.Three).build();
            playerInteraction.display(gameStateDto);

            expect(output.display.mock.calls[0][0]).toEqual(
                "1 | 2 | O\n" +
                "---------\n" +
                "4 | 5 | 6\n" +
                "---------\n" +
                "7 | 8 | 9\n",
            );
        });

        it('the game state after X wins', () => {
            const gameStateDto = aGameStateDto()
                .withFieldsWithX(Field.One, Field.Two, Field.Three)
                .withFieldsWithO(Field.Four, Field.Five)
                .winningPlayerX()
                .build();

            playerInteraction.display(gameStateDto);

            expect(output.display.mock.calls[0][0]).toEqual(
                "X | X | X\n" +
                "---------\n" +
                "O | O | 6\n" +
                "---------\n" +
                "7 | 8 | 9\n" +
                "X wins!\n",
            );
        });

        it('the game state after O wins', () => {
            const gameStateDto = aGameStateDto()
                .withFieldsWithO(Field.One, Field.Two, Field.Three)
                .withFieldsWithX(Field.Four, Field.Five, Field.Seven)
                .winningPlayerO()
                .build();

            playerInteraction.display(gameStateDto);

            expect(output.display.mock.calls[0][0]).toEqual(
                "O | O | O\n" +
                "---------\n" +
                "X | X | 6\n" +
                "---------\n" +
                "X | 8 | 9\n" +
                "O wins!\n",
            );
        });

        it('the game state after a draw', () => {
            const gameStateDto = aGameStateDto()
                .withFieldsWithX(Field.One, Field.Nine, Field.Eight, Field.Three, Field.Four)
                .withFieldsWithO(Field.Five, Field.Two, Field.Seven, Field.Six)
                .withNoOneWinning()
                .build()

            playerInteraction.display(gameStateDto);

            expect(output.display.mock.calls[0][0]).toEqual(
                "X | O | X\n" +
                "---------\n" +
                "X | O | O\n" +
                "---------\n" +
                "O | X | X\n" +
                "Draw!\n",
            );
        });
    });
});