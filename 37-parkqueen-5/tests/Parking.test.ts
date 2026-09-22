import {when} from 'jest-when';
import {Barrier} from '../src/Barrier';
import {PaymentGateway} from '../src/PaymentGateway';
import {Clock} from '../src/Clock';
import {GuardNotifier} from '../src/GuardNotifier';
import {Parking} from '../src/Parking';
import {FeesCalculator} from '../src/FeesCalculator';
import {addHoursTo, hoursInsideParking, parkingFeeOf} from "./TestHelpers";
import {BasicFeesCalculator} from "../src/fees-calculators/BasicFeesCalculator";

describe('Parking', () => {
    let barrier: jest.Mocked<Barrier>;
    let paymentGateway: jest.Mocked<PaymentGateway>;
    let clock: jest.Mocked<Clock>;
    let guardNotifier: jest.Mocked<GuardNotifier>;
    let parkingFeeCalculator: jest.Mocked<FeesCalculator>;
    let parking: Parking;

    beforeEach(() => {
        barrier = {open: jest.fn()};
        paymentGateway = {process: jest.fn()};
        clock = {now: jest.fn()};
        guardNotifier = {notify: jest.fn()};
        parkingFeeCalculator = {calculate: jest.fn()};
        parking = new Parking(barrier, paymentGateway, clock, guardNotifier, parkingFeeCalculator);
    });

    describe('one car', () => {
        const ANY_PLATE = 'XHTV1234';
        const anAmount = 2;

        it('opens the barrier when a new car enter', () => {
            parking.enter(ANY_PLATE);

            expect(barrier.open).toHaveBeenCalledTimes(1);
        });

        it('opens the barrier at exist when the payment is correct', () => {
            havingStayedSomeTimeInTheParking();
            whenPaymentIsCorrect();

            parking.enter(ANY_PLATE);
            parking.exit(ANY_PLATE);

            expect(barrier.open).toHaveBeenCalledTimes(2);
        });

        it('does not opens the barrier at exist when the payment fails', () => {
            havingStayedSomeTimeInTheParking();
            whenPaymentIsNotCorrect();

            parking.enter(ANY_PLATE);
            parking.exit(ANY_PLATE);

            expect(barrier.open).toHaveBeenCalledTimes(1);
            expect(guardNotifier.notify).toHaveBeenCalledWith(ANY_PLATE);
        });


        describe('amount is 0', () => {
            it('should bypass paymentGateway if amount is 0', () => {
                const ANY_PLATE = 'XHTV1234';
                havingStayedSomeTimeInTheParking();
                parkingFeeCalculator.calculate.mockReturnValue(parkingFeeOf(0))

                parking.enter(ANY_PLATE);
                parking.exit(ANY_PLATE);

                expect(paymentGateway.process).not.toHaveBeenCalled();
            })
        });

        function havingStayedSomeTimeInTheParking(): void {
            const timeInsideParking = hoursInsideParking(1);
            const parkingFee = parkingFeeOf(anAmount);
            when(clock.now).calledWith().mockReturnValueOnce(timeInsideParking.entryTime);
            when(clock.now).calledWith().mockReturnValueOnce(timeInsideParking.exitTime);
            when(parkingFeeCalculator.calculate).calledWith(timeInsideParking).mockReturnValue(parkingFee);
        }

        function whenPaymentIsCorrect(): void {
            whenPaymentIs(true);
        }

        function whenPaymentIsNotCorrect(): void {
            whenPaymentIs(false);
        }

        function whenPaymentIs(correct: boolean): void {
            when(paymentGateway.process).calledWith(anAmount).mockReturnValue(correct);
        }
    });

    describe('several cars', () => {
        let parkingFeeCalculator: FeesCalculator;

        beforeEach(() => {
            parkingFeeCalculator = new BasicFeesCalculator();
            parking = new Parking(barrier, paymentGateway, clock, guardNotifier, parkingFeeCalculator);
        });

        it('two enter and the first one exit', () => {
            const car1Plate = 'car1Plate';
            const car1TimeInParking = hoursInsideParking(2.5);
            const car2Plate = 'car2Plate';
            const car2EntryTime = addHoursTo(car1TimeInParking.entryTime, 0.5)

            when(clock.now).calledWith().mockReturnValueOnce(car1TimeInParking.entryTime);
            when(clock.now).calledWith().mockReturnValueOnce(car2EntryTime);
            when(clock.now).calledWith().mockReturnValueOnce(car1TimeInParking.exitTime);

            parking.enter(car1Plate);
            parking.enter(car2Plate);
            parking.exit(car1Plate);

            expect(paymentGateway.process).toHaveBeenCalledTimes(1);
            expect(paymentGateway.process).toHaveBeenCalledWith(4);
        })
    })

    describe('edge cases', () => {
        it('should not open the barrier and notify the security guard when a car with a plate that is not registered in the system exits', () => {
            parking.exit('aUnregisteredPlate');

            expect(barrier.open).not.toHaveBeenCalled();
            expect(guardNotifier.notify).toHaveBeenCalledTimes(1);
            expect(guardNotifier.notify).toHaveBeenCalledWith('aUnregisteredPlate');
        })

        it('should not open the barrier and notify the security guard when a car with a plate that is already in the system enters', () => {
            parking.enter('aPlate');
            parking.enter('aPlate');

            expect(barrier.open).toHaveBeenCalledTimes(1);
            expect(guardNotifier.notify).toHaveBeenCalledTimes(1);
            expect(guardNotifier.notify).toHaveBeenCalledWith('aPlate');
        })
    });

});