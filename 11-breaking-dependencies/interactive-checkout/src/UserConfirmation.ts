import {question} from "readline-sync";

export class UserConfirmation {
    private readonly _accepted: boolean;

    constructor(message: string) {
        const result = question(`${message} Choose Option (Y yes) (N no): `);

        this._accepted = result != null && result.toLowerCase() == "y";
    }

    wasAccepted(): boolean {
        return this._accepted;
    }
}