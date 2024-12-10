import {Field} from "../../src/Field";
import {WinnerDetector} from "../../src/WinnerDetector";


describe("WinnerDetector", () => {

    it.each([
        [[Field.One, Field.Two, Field.Three]],
        [[Field.Four, Field.Five, Field.Six]],
        [[Field.Seven, Field.Eight, Field.Nine]],
    ])('detects winner for all rows winning combinations in any order', (fields: Field[]): void  => {
        expect(WinnerDetector.hasWon(shuffle(fields))).toBeTruthy();
    });

    it.each([
        [[Field.One, Field.Four, Field.Seven]],
        [[Field.Two, Field.Five, Field.Eight]],
        [[Field.Three, Field.Six, Field.Nine]],
    ])('detects winner for all columns winning combinations in any order', (fields: Field[]): void  => {
        expect(WinnerDetector.hasWon(shuffle(fields))).toBeTruthy();
    });

    it.each([
        [[Field.One, Field.Two, Field.Three]],
        [[Field.Three, Field.Five, Field.Seven]],
    ])('detects winner for diagonal and anti-diagonal winning combinations in any order', (fields: Field[]): void  => {
        expect(WinnerDetector.hasWon(shuffle(fields))).toBeTruthy();
    });

    it.each([
        [[]],
        [[Field.Six]],
        [[Field.One, Field.Two]],
        [[Field.One, Field.Two, Field.Four]],
        [[Field.One, Field.Two, Field.Four, Field.Nine]],
        [[Field.One, Field.Nine, Field.Eight, Field.Three, Field.Four]],
        [[Field.Five, Field.Two, Field.Seven, Field.Six]],
    ])('does not detect winner for some not winning combination', (fields: Field[]): void => {
        expect(WinnerDetector.hasWon(shuffle(fields))).toBeFalsy();
    });

    function shuffle<T>(elements: Array<T>): Array<T> {
        return elements.sort(() => Math.random() - 0.5);
    }
});