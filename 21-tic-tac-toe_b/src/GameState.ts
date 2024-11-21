import {Field} from "./Field";
import {GameStateDto} from "./GameStateDto";
import {Player} from "./Player";

export abstract class GameState {
    protected readonly playerXFields: Field[];
    protected readonly playerOFields: Field[];

    static Initial(playerX: Player, playerO: Player): GameState {
        return new TurnX([], [], playerX, playerO);
    }

    protected constructor(playerXFields: Field[], playerOFields: Field[]) {
        this.playerXFields = playerXFields;
        this.playerOFields = playerOFields;
    }

    abstract turn(): GameState;

    showInitialMessageTo(player: Player): void {
        player.display(this.toDto());
    }

    onGoing(): boolean {
        return !this.hasXWon() && !this.isBoardFull() && !this.HasOWon();
    }

    private isBoardFull(): boolean {
        return (this.playerXFields.length + this.playerOFields.length) === 9;
    }

    private hasXWon(): boolean {
        return this.playerXFields.length === 3
            && this.playerXFields[0] === Field.One &&
            this.playerXFields[1] === Field.Two &&
            this.playerXFields[2] === Field.Three;
    }

    private HasOWon(): boolean {
        return this.playerOFields.length === 3
            && this.playerOFields[0] === Field.One &&
            this.playerOFields[1] === Field.Two &&
            this.playerOFields[2] === Field.Three;
    }

    protected addFieldToPlayerX(field: Field): void {
        this.playerXFields.push(field);
    }

    protected addFieldToPlayerO(field: Field): void {
        this.playerOFields.push(field);
    }

    protected displayTurnState(playerX: Player, playerO: Player): void {
        playerX.display(this.toDto());
        playerO.display(this.toDto());
    }

    private toDto(): GameStateDto {
        const playerX = [...this.playerXFields];
        const playerO = [...this.playerOFields];
        
        if (this.hasXWon()) {
            return GameStateDto.WinningX(playerX, playerO);
        }
        if (this.isBoardFull()) {
            return GameStateDto.NoWinner(playerX, playerO);
        }
        if (this.HasOWon()) {
            return GameStateDto.WinningO(playerX, playerO);
        }
        return GameStateDto.OnGoing(playerX, playerO);
    }
}

class TurnO extends GameState {
    private readonly playerX: Player;
    private readonly playerO: Player;

    constructor(playerXFields: Field[], playerOFields: Field[], playerX: Player, playerO: Player) {
        super(playerXFields, playerOFields);
        this.playerX = playerX;
        this.playerO = playerO;
    }

    turn(): GameState {
        this.addFieldToPlayerO(this.playerO.yourTurn());
        this.displayTurnState(this.playerX, this.playerO);
        return new TurnX(this.playerXFields, this.playerOFields, this.playerX, this.playerO);
    }
}

class TurnX extends GameState {
    private readonly playerX: Player;
    private readonly playerO: Player;

    constructor(playerXFields: Field[], playerOFields: Field[], playerX: Player, playerO: Player) {
        super(playerXFields, playerOFields);
        this.playerX = playerX;
        this.playerO = playerO;
    }

    turn(): GameState {
        this.addFieldToPlayerX(this.playerX.yourTurn());
        this.displayTurnState(this.playerX, this.playerO);
        return new TurnO(this.playerXFields, this.playerOFields, this.playerX, this.playerO);
    }
}