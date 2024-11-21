import {Field} from "../../src/Field";
import {GameStateDto, Over} from "../../src/GameStateDto";

export class GameStateDtoBuilder {
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