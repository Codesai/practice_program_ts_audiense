import {Field} from "./Field";

enum Result {
    X_Wins,
    O_Wins,
    Draw,
}

export class Over {
    public readonly result: Result;

    static X_Wins(): Over {
        return new Over(Result.X_Wins);
    }

    static O_Wins(): Over {
        return new Over(Result.O_Wins);
    }

    static Draw(): Over {
        return new Over(Result.Draw);
    }

    private constructor(result: Result) {
        this.result = result;
    }
}

class OnGoing {
}

export class GameStateDto {
    public readonly playerX: Field[];
    public readonly playerO: Field[];
    public readonly status: Over | OnGoing;

    static WinningX(playerX: Field[], playerO: Field[]): GameStateDto {
        return new GameStateDto(playerX, playerO, Over.X_Wins())
    }

    static WinningO(playerX: Field[], playerO: Field[]): GameStateDto {
        return new GameStateDto(playerX, playerO, Over.O_Wins())
    }

    static NoWinner(playerX: Field[], playerO: Field[]): GameStateDto {
        return new GameStateDto(playerX, playerO, Over.Draw())
    }

    static OnGoing(playerX: Field[], playerO: Field[]): GameStateDto {
        return new GameStateDto(playerX, playerO, new OnGoing())
    }

    constructor(playerX: Field[], playerO: Field[], status: Over | OnGoing = new OnGoing()) {
        this.playerX = playerX;
        this.playerO = playerO;
        this.status = status;
    }
}