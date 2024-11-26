import {Field} from "../../src/Field";

import {WinnerChecker} from "../../src/WinnerChecker";
import {Player} from "../../src/Player";

import * as fc from 'fast-check';

describe("winnerChecker", () => {
    it.each([
        [[Field.One, Field.Two, Field.Three]],
        [[Field.Four, Field.Five, Field.Six]],
        [[Field.Seven, Field.Eight, Field.Nine]],
    ])('wins for all rows winning combinations in any order', (fields) => {
        const player = new Player(fields);
        expect(WinnerChecker.hasWon(player)).toBeTruthy();
    });

    it.each([
        [[Field.One, Field.Four, Field.Seven]],
        [[Field.Two, Field.Five, Field.Eight]],
        [[Field.Three, Field.Six, Field.Nine]],
    ])('wins for all columns winning combinations in any order', (fields) => {
        const player = new Player(shuffle(fields));
        expect(WinnerChecker.hasWon(player)).toBeTruthy();
    });

    it.each([
        [[Field.One, Field.Two, Field.Three]],
        [[Field.Three, Field.Five, Field.Seven]],
    ])('wins for diagonal and anti-diagonal winning combinations in any order', (fields) => {
        const player = new Player(shuffle(fields));
        expect(WinnerChecker.hasWon(player)).toBeTruthy();
    });

    it('does not win when player has less than 3 fields', () => {
        const possibleFields = [Field.One, Field.Two, Field.Three, Field.Four, Field.Five, Field.Six, Field.Seven, Field.Eight, Field.Nine];
        fc.assert(
            fc.property(
                fc.shuffledSubarray(possibleFields, {minLength: 0, maxLength: 2}),
                ((fields: Field[]) => !WinnerChecker.hasWon(new Player(fields)))
            )
        );
    });

    it.each([
        [[Field.One, Field.Two, Field.Four]],
        [[Field.One, Field.Two, Field.Four, Field.Nine]],
        [[Field.One, Field.Nine, Field.Eight, Field.Three, Field.Four]],
        [[Field.Five, Field.Two, Field.Seven, Field.Six]],
    ])('does not win for some not winning combination', (fields) => {
        const player = new Player(shuffle(fields));
        expect(WinnerChecker.hasWon(player)).toBeFalsy();
    });

    function shuffle<T>(elements: Array<T>) {
        return elements.sort(() => Math.random() - 0.5);
    }
});