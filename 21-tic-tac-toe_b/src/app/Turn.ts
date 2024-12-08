import {GameStateDto} from "./GameStateDto";
import {PlayerInteraction} from "./PlayerInteraction";
import {Player} from "./Player";

export abstract class Turn {
    private readonly xPlayer: Player;
    private readonly oPlayer: Player;
    private readonly xPlayerInteraction: PlayerInteraction;
    private readonly oPlayerInteraction: PlayerInteraction;

    protected constructor(xPlayer: Player, oPlayer: Player, xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction) {
        this.xPlayer = xPlayer;
        this.oPlayer = oPlayer;
        this.xPlayerInteraction = xPlayerInteraction;
        this.oPlayerInteraction = oPlayerInteraction;
    }

    static Initial(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction): Turn {
        return new TurnForX(xPlayerInteraction, oPlayerInteraction, new Player([], xPlayerInteraction), new Player([], oPlayerInteraction));
    }

    abstract play(): Turn;

    showInitialMessage(): void {
        this.xPlayerInteraction.display(this.toDto());
    }

    thereIsNext(): boolean {
        return !this.xPlayer.hasWon() && !this.isBoardFull() && !this.oPlayer.hasWon();
    }

    protected abstract currentPlayer(): Player;

    protected abstract createWinningDto(): GameStateDto;

    protected playTurnOf(player: Player): void {
        player.playTurn();
        this.displayStateAfterTurn();
    }

    protected turnForX(): Turn {
        return new TurnForX(this.xPlayerInteraction, this.oPlayerInteraction, this.xPlayer, this.oPlayer);
    }

    protected turnForO(): Turn {
        return new TurnForO(this.xPlayerInteraction, this.oPlayerInteraction, this.xPlayer, this.oPlayer);
    }

    private toDto(): GameStateDto {
        if (this.currentPlayer().hasWon()) {
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
        this.xPlayerInteraction.display(this.toDto());
        this.oPlayerInteraction.display(this.toDto());
    }
}

class TurnForO extends Turn {
    private readonly player: Player;
    private readonly otherPlayer: Player;

    constructor(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction, xPlayer: Player, oPlayer: Player) {
        super(xPlayer, oPlayer, xPlayerInteraction, oPlayerInteraction);
        this.player = oPlayer;
        this.otherPlayer = xPlayer;
    }

    play(): Turn {
        this.playTurnOf(this.player)
        return this.turnForX();
    }

    protected currentPlayer(): Player {
        return this.player;
    }

    protected createWinningDto(): GameStateDto {
        return GameStateDto.WinningO(this.otherPlayer.toDto(), this.player.toDto());
    }
}

class TurnForX extends Turn {
    private readonly player: Player;
    private readonly otherPlayer: Player;

    constructor(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction, xPlayer: Player, oPlayer: Player) {
        super(xPlayer, oPlayer, xPlayerInteraction, oPlayerInteraction);
        this.player = xPlayer;
        this.otherPlayer = oPlayer;
    }

    play(): Turn {
        this.playTurnOf(this.currentPlayer())
        return this.turnForO();
    }

    protected currentPlayer() {
        return this.player;
    }

    protected createWinningDto() {
        return GameStateDto.WinningX(this.player.toDto(), this.otherPlayer.toDto());
    }
}