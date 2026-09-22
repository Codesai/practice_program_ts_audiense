import {parkingFeeOf} from "./TestHelpers";

describe('ParkingFee precondition', () => {
    it.each([
        [-1],
        [-0.1]
    ])('is violated when fees are negative', (amount) => {
        expect(() => parkingFeeOf(amount)).toThrow('Fees cannot be negative');
    });

    it.each([
        [0],
        [0.1]
    ])('is not violated when fees are equal or greater than 0', (amount) => {
        expect(() => parkingFeeOf(amount)).not.toThrow();
    });
});
