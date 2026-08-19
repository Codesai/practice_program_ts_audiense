import {when} from 'jest-when';
import {Barrier} from '../src/Barrier';
import {PaymentGateway} from '../src/PaymentGateway';
import {Clock} from '../src/Clock';
import {GuardNotifier} from '../src/GuardNotifier';
import {Parking} from '../src/Parking';
import {FeesCalculator} from '../src/FeesCalculator';
import {hoursInsideParking, parkingFeeOf} from "./TestHelpers";

describe('Parking', () => {
    const ANY_PLATE = 'XHTV1234';
    const anAmount = 2;
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

