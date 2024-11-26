import {Field} from "../../src/Field";

import {WinnerChecker} from "../../src/WinnerChecker";
import {Player} from "../../src/Player";

describe("winnerChecker", ()=>{
    it.each([
        {playerFields:[Field.One, Field.Two, Field.Three], expected:true},
        {playerFields:[Field.Four, Field.Five, Field.Six], expected:true},
        {playerFields:[Field.Seven, Field.Eight, Field.Nine], expected:true},
        {playerFields:[Field.One, Field.Four, Field.Seven], expected:true},
        {playerFields:[Field.Two, Field.Five, Field.Eight], expected:true},
        {playerFields:[Field.Three, Field.Six, Field.Nine], expected:true},
        {playerFields:[Field.One, Field.Five, Field.Nine], expected:true},
        {playerFields:[Field.Three, Field.Five, Field.Seven], expected:true},
    ])("hasWon", ({playerFields, expected}) => {
        const player = new Player(playerFields);
        expect(WinnerChecker.hasWon(player)).toEqual(expected);
    });

    it.each([
        [[Field.One, Field.Two, Field.Three]],
        [[Field.Four, Field.Five, Field.Six]],
        [[Field.Seven, Field.Eight, Field.Nine]],
    ])('wins for all rows winning combinations in any order', (fields) => {
        const player = new Player(shuffle(fields));
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
        [[Field.One, Field.Five, Field.Nine]],
        [[Field.Three, Field.Five, Field.Seven]],
    ])('wins for diagonal and anti-diagonal winning combinations in any order', (fields) => {
        const player = new Player(shuffle(fields));
        expect(WinnerChecker.hasWon(player)).toBeTruthy();
    });

    function shuffle<T>(elements: Array<T>) {
        return elements.sort(() => Math.random() - 0.5);
    }
});