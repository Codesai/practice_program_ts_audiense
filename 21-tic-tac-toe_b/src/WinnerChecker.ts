import {Player} from "./Player";
import {Field} from "./Field";

export class WinnerChecker {
    static hasWon(player: Player): boolean {
        const WINNING_STATES: Field[][] = [
            [Field.One, Field.Two, Field.Three],
            [Field.Four, Field.Five, Field.Six],
            [Field.Seven, Field.Eight, Field.Nine],
            [Field.One, Field.Four, Field.Seven],
            [Field.Two, Field.Five, Field.Eight],
            [Field.Three, Field.Six, Field.Nine],
            [Field.One, Field.Five, Field.Nine],
            [Field.Three, Field.Five, Field.Seven]
        ];

        return WINNING_STATES.some((combination: Field[]) => {
            return combination.every((field) => player.owns(field));
        });
    }
}