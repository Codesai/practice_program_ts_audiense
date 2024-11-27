import {Field} from "./Field";
import {WinnerChecker} from "./WinnerChecker";
import {PlayerInteraction} from "./PlayerInteraction";

export class Player {
    private readonly fields: Field[];
    private readonly playerInteraction: PlayerInteraction;

    constructor(fields: Field[], playerInteraction: PlayerInteraction) {
        this.fields = fields;
        this.playerInteraction = playerInteraction;
    }

    hasWon(): boolean {
        return WinnerChecker.hasWon(this);
    }

    owns(field: Field): boolean {
        return this.fields.includes(field);
    }

    playTurn(): void {
        this.addField(this.playerInteraction.yourTurn());
    }

    toDto(): Field[] {
        return [...this.fields];
    }

    numberOfFields(): number {
        return this.fields.length;
    }

    private addField(field: Field) {
        this.fields.push(field);
    }
}