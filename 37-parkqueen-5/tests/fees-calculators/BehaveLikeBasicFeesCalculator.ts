import {FeesCalculator} from "../../src/FeesCalculator";
import {TimeInsideParking} from "../../src/TimeInsideParking";

export function behaveLikeBasicFeesCalculator(
    aParking: () => FeesCalculator,
    timeInside: (hours: number) => TimeInsideParking
) {
    let parkingFeesCalculator: FeesCalculator;

    beforeEach(async () => {
        parkingFeesCalculator = aParking();
    });

    it.each([[0.5], [1]])('should calculate the fee for less than 1 hour (%s hours)', (hours) => {
        const fee = parkingFeesCalculator.calculate(timeInside(hours))

        expect(fee.amount).toBe(2);
    });

    it.each([[1.01], [2]])('should calculate the fee for more than 1 hour and up to 2 hours (%s hours)', (hours) => {
        const fee = parkingFeesCalculator.calculate(timeInside(hours))

        expect(fee.amount).toBe(3);
    });

    it.each([[2.2], [3]])('should calculate the fee for more than 2 hours and up to 3 hours (%s hours)', (hours) => {
        const fee = parkingFeesCalculator.calculate(timeInside(hours))

        expect(fee.amount).toBe(4);
    });

    it.each([[3.2], [4]])('should calculate the fee for more than 3 hours and up to 4 hours (%s hours)', (hours) => {
        const fee = parkingFeesCalculator.calculate(timeInside(hours))

        expect(fee.amount).toBe(5);
    });

    it.each([[4.3], [5]])('should calculate the fee for more than 4 hours and up to 5 hours (%s hours)', (hours) => {
        const fee = parkingFeesCalculator.calculate(timeInside(hours))

        expect(fee.amount).toBe(6);
    });

    it.each([[5.3], [6]])('should calculate the fee for more than 5 hours and up to 6 hours (%s hours)', (hours) => {
        const fee = parkingFeesCalculator.calculate(timeInside(hours))

        expect(fee.amount).toBe(7);
    });

    it.each([[6.5], [7]])('should calculate the fee for more than 6 hours and up to 7 hours (%s hours)', (hours) => {
        const fee = parkingFeesCalculator.calculate(timeInside(hours))

        expect(fee.amount).toBe(8);
    });

    it.each([[7.2], [8.1], [24]])('should have the fee fixed for more than 7 hours and up to 24 hours (%s hours)', (hours) => {
        const fee = parkingFeesCalculator.calculate(timeInside(hours))

        expect(fee.amount).toBe(9);
    });

    it.each([[24.1, 11], [48.1, 20]])('should calculate the fee for more than 1 day (%s hours)', (hours, amount) => {
        const fee = parkingFeesCalculator.calculate(timeInside(hours))

        expect(fee.amount).toBe(amount);
    });
}