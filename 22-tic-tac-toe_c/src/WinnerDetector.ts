import {Field} from "./Field";

export class WinnerDetector {
    private static WINNING_COMBINATIONS = [
        [Field.One, Field.Two, Field.Three],
        [Field.Four, Field.Five, Field.Six],
        [Field.Seven, Field.Eight, Field.Nine],
        [Field.One, Field.Four, Field.Seven],
        [Field.Two, Field.Five, Field.Eight],
        [Field.Three, Field.Six, Field.Nine],
        [Field.One, Field.Five, Field.Nine],
        [Field.Three, Field.Five, Field.Seven],
    ]

    static hasWon(fields: Field[]): boolean {
        return WinnerDetector.WINNING_COMBINATIONS.some((combination) => {
            return combination.every((field) => fields.includes(field));
        });
    }
}