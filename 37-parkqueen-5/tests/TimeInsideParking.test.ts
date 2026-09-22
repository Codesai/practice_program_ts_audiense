import {hoursInsideParking} from "./TestHelpers";

describe('TimeInsideParking precondition', () => {
    it.each([
        [-1],
        [0]
    ])('is violated when time in the parking is less or equal to 0', (hours) => {
        expect(() => hoursInsideParking(hours)).toThrow('Entry time must be before exit time');
    });

    it('is not violated when time in the parking is greater than 0', () => {
        expect(() => hoursInsideParking(0.1)).not.toThrow();
    });
});
