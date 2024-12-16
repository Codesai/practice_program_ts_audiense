import {GameStateDto} from "./GameStateDto";
import {PlayerInteraction} from "./ports/PlayerInteraction";
import {Player} from "./Player";

export abstract class Turn {
    protected readonly currentPlayer: Player;
    protected readonly otherPlayer: Player;

    protected constructor(currentPlayer: Player, otherPlayer: Player) {
        this.currentPlayer = currentPlayer;
        this.otherPlayer = otherPlayer;
    }

    static Initial(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction): Turn {
        const xPlayer = new Player([], xPlayerInteraction);
        const oPlayer = new Player([], oPlayerInteraction);
        return new TurnForX(xPlayer, oPlayer);
    }

    play(): Turn {
        this.currentPlayer.playTurn();
        this.displayStateAfterTurn();
        return this.next();
    }

    showInitialMessage(): void {
        this.currentPlayer.see(this.toDto());
    }

    thereIsNext(): boolean {
        return !this.currentPlayer.hasWon() && !this.isBoardFull() && !this.otherPlayer.hasWon();
    }

    protected abstract createWinningDto(): GameStateDto;

    protected abstract next(): Turn;

    protected abstract NoWinnerDto(): GameStateDto ;

    protected abstract OnGoingDto(): GameStateDto;

    protected isBoardFull(): boolean {
        return (this.currentPlayer.numberOfFields() + this.otherPlayer.numberOfFields()) === 9;
    }

    private toDto(): GameStateDto {
        if (this.currentPlayer.hasWon()) {
            return this.createWinningDto();
        }
        if (this.thereIsNext()) {
            return this.OnGoingDto();
        }
        return this.NoWinnerDto();
    }

    private displayStateAfterTurn(): void {
        this.currentPlayer.see(this.toDto());
        this.otherPlayer.see(this.toDto());
    }
}

class TurnForO extends Turn {
    constructor(currentPlayer: Player, otherPlayer: Player) {
        super(currentPlayer, otherPlayer);
    }

    protected next(): Turn {
        return new TurnForX(this.otherPlayer, this.currentPlayer);
    }

    protected createWinningDto(): GameStateDto {
        return GameStateDto.WinningO(this.otherPlayer.toDto(), this.currentPlayer.toDto());
    }

    protected NoWinnerDto(): GameStateDto {
        return GameStateDto.NoWinner(this.otherPlayer.toDto(), this.currentPlayer.toDto());
    }

    protected OnGoingDto(): GameStateDto {
        return GameStateDto.OnGoing(this.otherPlayer.toDto(), this.currentPlayer.toDto());
    }
}

class TurnForX extends Turn {
    constructor(currentPlayer: Player, otherPlayer: Player) {
        super(currentPlayer, otherPlayer);
    }

    protected next(): Turn {
        return new TurnForO(this.otherPlayer, this.currentPlayer);
    }

    protected createWinningDto(): GameStateDto {
        return GameStateDto.WinningX(this.currentPlayer.toDto(), this.otherPlayer.toDto());
    }

    protected NoWinnerDto(): GameStateDto {
        return GameStateDto.NoWinner(this.currentPlayer.toDto(), this.otherPlayer.toDto());
    }

    protected OnGoingDto(): GameStateDto {
        return GameStateDto.OnGoing(this.currentPlayer.toDto(), this.otherPlayer.toDto());
    }
}