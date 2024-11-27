import {GameStateDto} from "./GameStateDto";
import {PlayerInteraction} from "./PlayerInteraction";
import {Player} from "./Player";

export abstract class Board {
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

    static Initial(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction): Board {
        return new BoardWhenTurnForX(xPlayerInteraction, oPlayerInteraction, new Player([], xPlayerInteraction), new Player([], oPlayerInteraction));
    }

    abstract turn(): Board;

    showInitialMessage(): void {
        this.xPlayerInteraction.display(this.toDto());
    }

    gameGoesOn(): boolean {
        return !this.xPlayer.hasWon() && !this.isBoardFull() && !this.oPlayer.hasWon();
    }

    protected abstract currentPlayer(): Player;

    protected abstract createWinningDto(): GameStateDto;

    protected playTurnOf(player: Player): void {
        player.playTurn();
        this.displayStateAfterTurn();
    }

    protected turnForX(): Board {
        return new BoardWhenTurnForX(this.xPlayerInteraction, this.oPlayerInteraction, this.xPlayer, this.oPlayer);
    }

    protected turnForO(): Board {
        return new BoardWhenTurnForO(this.xPlayerInteraction, this.oPlayerInteraction, this.xPlayer, this.oPlayer);
    }

    private toDto(): GameStateDto {
        if (this.currentPlayer().hasWon()) {
            return this.createWinningDto();
        }
        if (this.gameGoesOn()) {
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

class BoardWhenTurnForO extends Board {
    private readonly player: Player;
    private readonly otherPlayer: Player;

    constructor(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction, xPlayer: Player, oPlayer: Player) {
        super(xPlayer, oPlayer, xPlayerInteraction, oPlayerInteraction);
        this.player = oPlayer;
        this.otherPlayer = xPlayer;
    }

    turn(): Board {
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

class BoardWhenTurnForX extends Board {
    private readonly player: Player;
    private readonly otherPlayer: Player;

    constructor(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction, xPlayer: Player, oPlayer: Player) {
        super(xPlayer, oPlayer, xPlayerInteraction, oPlayerInteraction);
        this.player = xPlayer;
        this.otherPlayer = oPlayer;
    }

    turn(): Board {
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