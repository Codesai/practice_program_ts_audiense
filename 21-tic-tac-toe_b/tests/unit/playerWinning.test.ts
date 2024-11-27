import {Field} from "../../src/app/Field";

import {Player} from "../../src/app/Player";
import {PlayerInteraction} from "../../src/app/PlayerInteraction";

describe("A player", () => {

    it.each([
        [[Field.One, Field.Two, Field.Three]],
        [[Field.Four, Field.Five, Field.Six]],
        [[Field.Seven, Field.Eight, Field.Nine]],
    ])('wins for all rows winning combinations in any order', (fields) => {
        const player = aPlayer(fields);
        expect(player.hasWon()).toBeTruthy();
    });

    it.each([
        [[Field.One, Field.Four, Field.Seven]],
        [[Field.Two, Field.Five, Field.Eight]],
        [[Field.Three, Field.Six, Field.Nine]],
    ])('wins for all columns winning combinations in any order', (fields) => {
        const player = aPlayer(shuffle(fields));
        expect(player.hasWon()).toBeTruthy();
    });

    it.each([
        [[Field.One, Field.Two, Field.Three]],
        [[Field.Three, Field.Five, Field.Seven]],
    ])('wins for diagonal and anti-diagonal winning combinations in any order', (fields) => {
        const player = aPlayer(shuffle(fields));
        expect(player.hasWon()).toBeTruthy();
    });

    it.each([
        [[]],
        [[Field.Six]],
        [[Field.One, Field.Two]],
        [[Field.One, Field.Two, Field.Four]],
        [[Field.One, Field.Two, Field.Four, Field.Nine]],
        [[Field.One, Field.Nine, Field.Eight, Field.Three, Field.Four]],
        [[Field.Five, Field.Two, Field.Seven, Field.Six]],
    ])('does not win for some not winning combination', (fields) => {
        const player = aPlayer(shuffle(fields));
        expect(player.hasWon()).toBeFalsy();
    });

    function shuffle<T>(elements: Array<T>): Array<T> {
        return elements.sort(() => Math.random() - 0.5);
    }

    function aPlayer(fields: any): Player {
        const playerInteraction: jest.Mocked<PlayerInteraction> = {
            display: jest.fn(),
            yourTurn: jest.fn()
        }
        return new Player(fields, playerInteraction);
    }
});