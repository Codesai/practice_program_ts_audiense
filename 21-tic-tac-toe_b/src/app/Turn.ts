import {GameStateDto} from "./GameStateDto";
import {PlayerInteraction} from "./PlayerInteraction";
import {Player} from "./Player";

export abstract class Turn {
    protected readonly xPlayer: Player;
    protected readonly oPlayer: Player;

    protected constructor(xPlayer: Player, oPlayer: Player) {
        this.xPlayer = xPlayer;
        this.oPlayer = oPlayer;
    }

    static Initial(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction): Turn {
        return new TurnForX(new Player([], xPlayerInteraction), new Player([], oPlayerInteraction));
    }

    play(): Turn {
        this.currentPlayerPlayTurn();
        this.displayStateAfterTurn();
        return this.next();
    }

    showInitialMessage(): void {
        this.xPlayer.see(this.toDto());
    }

    thereIsNext(): boolean {
        return !this.xPlayer.hasWon() && !this.isBoardFull() && !this.oPlayer.hasWon();
    }

    protected abstract createWinningDto(): GameStateDto;

    protected abstract currentPlayerHasWon(): boolean;

    protected abstract next(): Turn;

    protected abstract currentPlayerPlayTurn(): void;

    protected turnForX(): Turn {
        return new TurnForX(this.xPlayer, this.oPlayer);
    }

    protected turnForO(): Turn {
        return new TurnForO(this.xPlayer, this.oPlayer);
    }

    private toDto(): GameStateDto {
        if (this.currentPlayerHasWon()) {
            return this.createWinningDto();
        }
        if (this.thereIsNext()) {
            return this.OnGoingDto();
        }
        return this.NoWinnerDto();
    }

    private NoWinnerDto(): GameStateDto {
        return GameStateDto.NoWinner(this.xPlayer.toDto(), this.oPlayer.toDto());
    }

    private OnGoingDto(): GameStateDto {
        return GameStateDto.OnGoing(this.xPlayer.toDto(), this.oPlayer.toDto());
    }

    private isBoardFull(): boolean {
        return (this.xPlayer.numberOfFields() + this.oPlayer.numberOfFields()) === 9;
    }

    private displayStateAfterTurn(): void {
        this.xPlayer.see(this.toDto());
        this.oPlayer.see(this.toDto());
    }
}

class TurnForO extends Turn {
    constructor(xPlayer: Player, oPlayer: Player) {
        super(xPlayer, oPlayer, );
    }

    protected currentPlayerPlayTurn(): void {
        this.oPlayer.playTurn();
    }

    protected next(): Turn {
        return this.turnForX();
    }

    protected currentPlayerHasWon(): boolean {
        return this.oPlayer.hasWon();
    }

    protected createWinningDto(): GameStateDto {
        return GameStateDto.WinningO(this.xPlayer.toDto(), this.oPlayer.toDto());
    }
}

class TurnForX extends Turn {
    constructor(xPlayer: Player, oPlayer: Player) {
        super(xPlayer, oPlayer);
    }

    protected currentPlayerPlayTurn(): void {
        this.xPlayer.playTurn();
    }

    protected next(): Turn {
        return this.turnForO();
    }

    protected currentPlayerHasWon(): boolean {
        return this.xPlayer.hasWon();
    }

    protected createWinningDto(): GameStateDto {
        return GameStateDto.WinningX(this.xPlayer.toDto(), this.oPlayer.toDto());
    }
}