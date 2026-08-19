import {parkingFeeOf} from "./TestHelpers";

describe('ParkingFee preconditions', () => {
    it.each([
        [-1],
        [-0.1]
    ])('throws an error for fees less than 0', (amount) => {
        expect(() => parkingFeeOf(amount)).toThrow('Fees cannot be negative');
    });

    it.each([
        [0],
        [0.1]
    ])('does not throw an error for fees equal or greater than 0', (amount) => {
        expect(() => parkingFeeOf(amount)).not.toThrow();
    });
});
