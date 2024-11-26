import {GameStateDto} from "./GameStateDto";
import {PlayerInteraction} from "./PlayerInteraction";
import {Player} from "./Player";

export abstract class Board {
    protected readonly xPlayer: Player;
    protected readonly oPlayer: Player;
    protected readonly xPlayerInteraction: PlayerInteraction;
    protected readonly oPlayerInteraction: PlayerInteraction;

    protected constructor(xPlayer: Player, oPlayer: Player, xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction) {
        this.xPlayer = xPlayer;
        this.oPlayer = oPlayer;
        this.xPlayerInteraction = xPlayerInteraction;
        this.oPlayerInteraction = oPlayerInteraction;
    }

    static Initial(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction): Board {
        return new TurnX(xPlayerInteraction, oPlayerInteraction, new Player([]), new Player([]));
    }

    abstract turn(): Board;

    showInitialMessage(): void {
        this.xPlayerInteraction.display(this.toDto());
    }

    gameGoesOn(): boolean {
        return !this.xPlayer.hasWon() && !this.isBoardFull() && !this.oPlayer.hasWon();
    }

    protected displayStateAfterTurn(): void {
        this.xPlayerInteraction.display(this.toDto());
        this.oPlayerInteraction.display(this.toDto());
    }

    protected createTurnForX(): Board {
        return new TurnX(this.xPlayerInteraction, this.oPlayerInteraction, this.xPlayer, this.oPlayer);
    }

    protected createTurnForO(): Board {
        return new TurnO(this.xPlayerInteraction, this.oPlayerInteraction, this.xPlayer, this.oPlayer);
    }

    protected toDto(): GameStateDto {
        if(this.gameGoesOn()) {
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
        return (this.xPlayer.toDto().length + this.oPlayer.toDto().length) === 9;
    }
}

class TurnO extends Board {
    constructor(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction, xPlayer: Player, oPlayer: Player) {
        super(xPlayer, oPlayer, xPlayerInteraction, oPlayerInteraction);
    }

    turn(): Board {
        this.oPlayer.addField(this.oPlayerInteraction.yourTurn());
        this.displayStateAfterTurn();
        return this.createTurnForX();
    }

    protected toDto(): GameStateDto {
        if (this.oPlayer.hasWon()) {
            return GameStateDto.WinningO(this.xPlayer.toDto(), this.oPlayer.toDto());
        }
        return super.toDto();
    }
}

class TurnX extends Board {
    constructor(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction, xPlayer: Player, oPlayer: Player) {
        super(xPlayer, oPlayer, xPlayerInteraction, oPlayerInteraction);
    }

    turn(): Board {
        this.xPlayer.addField(this.xPlayerInteraction.yourTurn());
        this.displayStateAfterTurn();
        return this.createTurnForO();
    }

    protected toDto(): GameStateDto {
        if (this.xPlayer.hasWon()) {
            return GameStateDto.WinningX(this.xPlayer.toDto(), this.oPlayer.toDto());
        }
        return super.toDto();
    }
}