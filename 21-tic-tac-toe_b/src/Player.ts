import {Field} from "./Field";

export class Player {
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