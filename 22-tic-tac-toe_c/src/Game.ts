import {Player} from "./Player";
import {Field} from "./Field";
import {GameStateDto} from "./GameStateDto";
import {WinnerDetector} from "./WinnerDetector";

enum Turn {
    X,
    O,
}

export class Game {
    public readonly playerXFields: Field[];
    public readonly playerOFields: Field[];
    private readonly playerX: Player;
    private readonly playerO: Player;
    private turn: Turn;

    constructor(playerX: Player, playerO: Player) {
        this.playerO = playerO;
        this.playerX = playerX;
        this.turn = Turn.X;
        this.playerXFields = [];
        this.playerOFields = [];
    }

    start(): void {
        this.playerX.display(this.toDto());
        this.startTurns();
    }

    private startTurns(): void {
        while (this.onGoing()) {
            if (this.turn === Turn.X) {
                this.turnX();
                this.turn = Turn.O;
            } else {
                this.turnO();
                this.turn = Turn.X;
            }
        }
    }

    private turnO(): void {
        this.addFieldToPlayerO(this.playerO.yourTurn());
        this.displayTurnState(this.playerX, this.playerO);
    }

    private turnX(): void {
        this.addFieldToPlayerX(this.playerX.yourTurn());
        this.displayTurnState(this.playerX, this.playerO);
    }

    private onGoing(): boolean {
        return !this.hasXWon() && !this.isBoardFull() && !this.HasOWon();
    }

    private addFieldToPlayerX(field: Field): void {
        this.playerXFields.push(field);
    }

    private addFieldToPlayerO(field: Field): void {
        this.playerOFields.push(field);
    }

    private displayTurnState(playerX: Player, playerO: Player): void {
        playerX.display(this.toDto());
        playerO.display(this.toDto());
    }

    private toDto(): GameStateDto {
        const playerX: Field[] = [...this.playerXFields];
        const playerO: Field[] = [...this.playerOFields];

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

    private isBoardFull(): boolean {
        return (this.playerXFields.length + this.playerOFields.length) === 9;
    }

    private hasXWon(): boolean {
        return WinnerDetector.hasWon(this.playerXFields);
    }

    private HasOWon(): boolean {
        return WinnerDetector.hasWon(this.playerOFields);
    }
}