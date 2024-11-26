import {Field} from "./Field";
import {WinnerChecker} from "./WinnerChecker";

export class Player {
    private readonly fields: Field[];

    constructor(fields: Field[]) {
        this.fields = fields;
    }

    addField(field: Field) {
        this.fields.push(field);
    }

    toDto() {
        return [...this.fields];
    }

    hasWon(): boolean {
        return WinnerChecker.hasWon(this);
    }

    owns(field: Field): boolean {
        return this.fields.includes(field);
    }
}