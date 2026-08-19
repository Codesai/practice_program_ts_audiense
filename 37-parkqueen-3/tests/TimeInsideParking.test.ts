import {hoursInsideParking} from "./TestHelpers";

describe('TimeInsideParking preconditions', () => {
    it.each([
        [-1],
        [0]
    ])('throws an error for being in the parking for a duration less or equal to 0', (hours) => {
        expect(() => hoursInsideParking(hours)).toThrow('Entry time must be before exit time');
    });

    it('throws an error for being in the parking for a duration greater than 0', () => {
        expect(() => hoursInsideParking(0.1)).not.toThrow();
    });
});
