import {Field} from "./Field";
import {GameStateDto} from "./GameStateDto";
import {PlayerInteraction} from "./PlayerInteraction";

export abstract class GameState {
    protected readonly xPlayer: Player;
    protected readonly oPlayer: Player;

    protected constructor(xPlayer: Player, oPlayer: Player) {
        this.xPlayer = xPlayer;
        this.oPlayer = oPlayer;
    }

    static Initial(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction): GameState {
        return new TurnX(xPlayerInteraction, oPlayerInteraction, new Player([]), new Player([]));
    }

    abstract turn(): GameState;

    showInitialMessageTo(playerInteraction: PlayerInteraction): void {
        playerInteraction.display(this.toDto());
    }

    onGoing(): boolean {
        return !this.xPlayer.hasWon() && !this.isBoardFull() && !this.oPlayer.hasWon();
    }

    protected displayStateAfterTurn(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction): void {
        xPlayerInteraction.display(this.toDto());
        oPlayerInteraction.display(this.toDto());
    }

    protected createTurnForX(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction): GameState {
        return new TurnX(xPlayerInteraction, oPlayerInteraction, this.xPlayer, this.oPlayer);
    }

    protected createTurnForO(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction): GameState {
        return new TurnO(xPlayerInteraction, oPlayerInteraction, this.xPlayer, this.oPlayer);
    }

    protected toDto(): GameStateDto {
        const playerXFields = this.xPlayer.getFields();
        const playerOFields = this.oPlayer.getFields();

        if (this.isBoardFull()) {
            return GameStateDto.NoWinner(playerXFields, playerOFields);
        }
        return GameStateDto.OnGoing(playerXFields, playerOFields);
    }

    private isBoardFull(): boolean {
        return (this.xPlayer.getFields().length + this.oPlayer.getFields().length) === 9;
    }
}

class TurnO extends GameState {
    private readonly xPlayerInteraction: PlayerInteraction;
    private readonly oPlayerInteraction: PlayerInteraction;

    constructor(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction, xPlayer: Player, oPlayer: Player) {
        super(xPlayer, oPlayer);
        this.xPlayerInteraction = xPlayerInteraction;
        this.oPlayerInteraction = oPlayerInteraction;
    }

    turn(): GameState {
        this.oPlayer.addField(this.oPlayerInteraction.yourTurn());
        this.displayStateAfterTurn(this.xPlayerInteraction, this.oPlayerInteraction);
        return this.createTurnForX(this.xPlayerInteraction, this.oPlayerInteraction);
    }

    protected toDto(): GameStateDto {
        if (this.oPlayer.hasWon()) {
            return GameStateDto.WinningO(this.xPlayer.getFields(), this.oPlayer.getFields());
        }
        return super.toDto();
    }
}

class TurnX extends GameState {
    private readonly xPlayerInteraction: PlayerInteraction;
    private readonly oPlayerInteraction: PlayerInteraction;

    constructor(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction, xPlayer: Player, oPlayer: Player) {
        super(xPlayer, oPlayer);
        this.xPlayerInteraction = xPlayerInteraction;
        this.oPlayerInteraction = oPlayerInteraction;
    }

    turn(): GameState {
        this.xPlayer.addField(this.xPlayerInteraction.yourTurn());
        this.displayStateAfterTurn(this.xPlayerInteraction, this.oPlayerInteraction);
        return this.createTurnForO(this.xPlayerInteraction, this.oPlayerInteraction);
    }

    protected toDto(): GameStateDto {
        if (this.xPlayer.hasWon()) {
            return GameStateDto.WinningX(this.xPlayer.getFields(), this.oPlayer.getFields());
        }
        return super.toDto();
    }
}

class Player {
    private readonly fields: Field[];
    constructor(fields: Field[]) {
        this.fields = fields;
    }

    addField(field: Field) {
        this.fields.push(field);
    }

    getFields() {
        return [...this.fields];
    }

    hasWon(): boolean {
        return this.fields.length === 3
            && this.fields[0] === Field.One &&
            this.fields[1] === Field.Two &&
            this.fields[2] === Field.Three;
    }
}