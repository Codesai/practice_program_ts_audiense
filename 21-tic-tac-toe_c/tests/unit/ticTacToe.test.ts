import {Player} from "../../src/Player";
import {Game} from "../../src/Game";
import {aGameStateDto, GameStateDtoBuilder, initialGameStateDto} from "../helpers/GameStateDtoBuilder";
import {Field} from "../../src/Field";
import {GameStateDto} from "../../src/GameStateDto";


describe("Tic Tac Toe", () => {
    let playerX: jest.Mocked<Player>;
    let playerO: jest.Mocked<Player>;
    let game: Game;
    let gameDto: GameStateDtoBuilder;

    beforeEach(() => {
        playerX = {
            display: jest.fn(),
            yourTurn: jest.fn(),
        };
        playerO = {
            display: jest.fn(),
            yourTurn: jest.fn(),
        };
        gameDto = aGameStateDto();
        game = new Game(playerX, playerO);
    });

    it("player X wins after her third turn", () => {
        playerX.yourTurn
            .mockReturnValueOnce(Field.One)
            .mockReturnValueOnce(Field.Two)
            .mockReturnValueOnce(Field.Three);
        playerO.yourTurn
            .mockReturnValueOnce(Field.Four)
            .mockReturnValueOnce(Field.Five);

        game.start();

        expectInitialDisplay();
        expectPlayerTurn(1, gameDto.addingFieldToX(Field.One).build());
        expectPlayerTurn(2, gameDto.addingFieldToO(Field.Four).build());
        expectPlayerTurn(3, gameDto.addingFieldToX( Field.Two).build());
        expectPlayerTurn(4, gameDto.addingFieldToO(Field.Five).build());
        expectPlayerTurn(5, gameDto.addingFieldToX(Field.Three).winningPlayerX().build());
    });

    it("player O wins after her third turn", () => {
        playerX.yourTurn
            .mockReturnValueOnce(Field.Four)
            .mockReturnValueOnce(Field.Five)
            .mockReturnValueOnce(Field.Seven);
        playerO.yourTurn
            .mockReturnValueOnce(Field.One)
            .mockReturnValueOnce(Field.Two)
            .mockReturnValueOnce(Field.Three);

        game.start();

        expectInitialDisplay();
        expectPlayerTurn(1, gameDto.addingFieldToX(Field.Four).build());
        expectPlayerTurn(2, gameDto.addingFieldToO(Field.One).build());
        expectPlayerTurn(3, gameDto.addingFieldToX(Field.Five).build());
        expectPlayerTurn(4, gameDto.addingFieldToO(Field.Two).build());
        expectPlayerTurn(5, gameDto.addingFieldToX(Field.Seven).build());
        expectPlayerTurn(6, gameDto.addingFieldToO(Field.Three).winningPlayerO().build());
    });

    it("there is a draw when X1 → O5 → X9 → O2 → X8 → O7 → X3 → O6 → X4", () => {
        playerX.yourTurn
            .mockReturnValueOnce(Field.One)
            .mockReturnValueOnce(Field.Nine)
            .mockReturnValueOnce(Field.Eight)
            .mockReturnValueOnce(Field.Three)
            .mockReturnValueOnce(Field.Four);
        playerO.yourTurn
            .mockReturnValueOnce(Field.Five)
            .mockReturnValueOnce(Field.Two)
            .mockReturnValueOnce(Field.Seven)
            .mockReturnValueOnce(Field.Six);

        game.start();

        expectInitialDisplay();
        expectPlayerTurn(1, gameDto.addingFieldToX(Field.One).build());
        expectPlayerTurn(2, gameDto.addingFieldToO(Field.Five).build());
        expectPlayerTurn(3, gameDto.addingFieldToX(Field.Nine).build());
        expectPlayerTurn(4, gameDto.addingFieldToO(Field.Two).build());
        expectPlayerTurn(5, gameDto.addingFieldToX(Field.Eight).build());
        expectPlayerTurn(6, gameDto.addingFieldToO(Field.Seven).build());
        expectPlayerTurn(7, gameDto.addingFieldToX(Field.Three).build());
        expectPlayerTurn(8, gameDto.addingFieldToO(Field.Six).build());
        expectPlayerTurn(9, gameDto.addingFieldToX(Field.Four).withNoOneWinning().build());
    })

    function expectPlayerTurn(turnNumber: number, gameStateDto: GameStateDto): void {
        expect(playerX.display.mock.calls[turnNumber][0]).toEqual(gameStateDto);
        expect(playerO.display.mock.calls[turnNumber - 1][0]).toEqual(gameStateDto);
    }

    function expectInitialDisplay(): void {
        expect(playerX.display.mock.calls[0][0]).toEqual(initialGameStateDto());
    }
});
