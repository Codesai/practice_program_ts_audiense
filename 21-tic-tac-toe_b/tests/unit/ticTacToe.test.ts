import {Game} from "../../src/Game";

import {Player} from "../../src/Player";
import {GameStateDto, Over} from "../../src/GameStateDto";
import {Field} from "../../src/Field";

describe("Tic Tac Toe", () => {
    let playerX: jest.Mocked<Player>;
    let playerO: jest.Mocked<Player>;
    let game: Game;

    beforeEach(() => {
        playerX = {
            display: jest.fn(),
            yourTurn: jest.fn(),
        };
        playerO = {
            display: jest.fn(),
            yourTurn: jest.fn(),
        };
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

        expectInitialPrompt();
        expectPlayerTurn(1, aGameStateDto().withFieldsWithX(Field.One).build());
        expectPlayerTurn(2, aGameStateDto().withFieldsWithX(Field.One).withFieldsWithO(Field.Four).build());
        expectPlayerTurn(3, aGameStateDto().withFieldsWithX(Field.One, Field.Two).withFieldsWithO(Field.Four).build());
        expectPlayerTurn(4, aGameStateDto().withFieldsWithX(Field.One, Field.Two).withFieldsWithO(Field.Four, Field.Five).build());
        expectPlayerTurn(5, aGameStateDto().withFieldsWithX(Field.One, Field.Two, Field.Three).withFieldsWithO(Field.Four, Field.Five).winningPlayerX().build());
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

        expectInitialPrompt();
        expectPlayerTurn(1, aGameStateDto().withFieldsWithX(Field.Four).build());
        expectPlayerTurn(2, aGameStateDto().withFieldsWithX(Field.Four).withFieldsWithO(Field.One).build());
        expectPlayerTurn(3, aGameStateDto().withFieldsWithX(Field.Four, Field.Five).withFieldsWithO(Field.One).build());
        expectPlayerTurn(4, aGameStateDto().withFieldsWithX(Field.Four, Field.Five).withFieldsWithO(Field.One, Field.Two).build());
        expectPlayerTurn(5, aGameStateDto().withFieldsWithX(Field.Four, Field.Five, Field.Seven).withFieldsWithO(Field.One, Field.Two).build());
        expectPlayerTurn(6, aGameStateDto().withFieldsWithX(Field.Four, Field.Five, Field.Seven).withFieldsWithO(Field.One, Field.Two, Field.Three).winningPlayerO().build());
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

        expectInitialPrompt();
        expectPlayerTurn(1, aGameStateDto().withFieldsWithX(Field.One).build());
        expectPlayerTurn(2, aGameStateDto().withFieldsWithX(Field.One).withFieldsWithO(Field.Five).build());
        expectPlayerTurn(3, aGameStateDto().withFieldsWithX(Field.One, Field.Nine).withFieldsWithO(Field.Five).build());
        expectPlayerTurn(4, aGameStateDto().withFieldsWithX(Field.One, Field.Nine).withFieldsWithO(Field.Five, Field.Two).build());
        expectPlayerTurn(5, aGameStateDto().withFieldsWithX(Field.One, Field.Nine, Field.Eight).withFieldsWithO(Field.Five, Field.Two).build());
        expectPlayerTurn(6, aGameStateDto().withFieldsWithX(Field.One, Field.Nine, Field.Eight).withFieldsWithO(Field.Five, Field.Two, Field.Seven).build());
        expectPlayerTurn(7, aGameStateDto().withFieldsWithX(Field.One, Field.Nine, Field.Eight, Field.Three).withFieldsWithO(Field.Five, Field.Two, Field.Seven).build());
        expectPlayerTurn(8, aGameStateDto().withFieldsWithX(Field.One, Field.Nine, Field.Eight, Field.Three).withFieldsWithO(Field.Five, Field.Two, Field.Seven, Field.Six).build());
        expectPlayerTurn(9, aGameStateDto().withFieldsWithX(Field.One, Field.Nine, Field.Eight, Field.Three, Field.Four).withFieldsWithO(Field.Five, Field.Two, Field.Seven, Field.Six).withNoOneWinning().build());
    })

    function expectPlayerTurn(turnNumber: number, gameStateDto: GameStateDto): void {
        expect(playerX.display.mock.calls[turnNumber][0]).toEqual(gameStateDto);
        expect(playerO.display.mock.calls[turnNumber - 1][0]).toEqual(gameStateDto);
    }

    function expectInitialPrompt(): void {
        expect(playerX.display).toHaveBeenNthCalledWith(
            1,
            InitialGameStateDto(),
        );
    }

    function InitialGameStateDto(): GameStateDto {
        return GameStateDtoBuilder.aGameStateDto().build()
    }

    function aGameStateDto(): GameStateDtoBuilder {
        return GameStateDtoBuilder.aGameStateDto();
    }

    class GameStateDtoBuilder {
        private _playerX: Field[] = [];
        private _playerO: Field[] = [];
        private _status: Over;

        private constructor() {
            this._playerX = [];
            this._playerO = [];
        }

        static aGameStateDto(): GameStateDtoBuilder {
            return new GameStateDtoBuilder();
        }

        withFieldsWithX(...playerX: Field[]): GameStateDtoBuilder {
            this._playerX = playerX;
            return this;
        }

        withFieldsWithO(...playerO: Field[]): GameStateDtoBuilder {
            this._playerO = playerO;
            return this;
        }

        winningPlayerX(): GameStateDtoBuilder {
            this._status = Over.X_Wins();
            return this;
        }

        winningPlayerO(): GameStateDtoBuilder {
            this._status = Over.O_Wins();
            return this;
        }

        withNoOneWinning(): GameStateDtoBuilder {
            this._status = Over.Draw();
            return this;
        }

        build(): GameStateDto {
            if (this._status) {
                return new GameStateDto(this._playerX, this._playerO, this._status);
            }
            return new GameStateDto(this._playerX, this._playerO)
        }
    }
});
