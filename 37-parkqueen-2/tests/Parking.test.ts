import {when} from 'jest-when'
import {Barrier} from '../src/Barrier';
import {PaymentGateway} from '../src/PaymentGateway';
import {Clock} from '../src/Clock';
import {GuardNotifier} from '../src/GuardNotifier';
import {Parking} from '../src/Parking';

describe('Parking', () => {
    const ANY_PLATE = 'XHTV1234';
    let barrier: jest.Mocked<Barrier>;
    let paymentGateway: jest.Mocked<PaymentGateway>;
    let parking: Parking;
    let clock: jest.Mocked<Clock>;
    let guardNotifier: jest.Mocked<GuardNotifier>;

    beforeEach(() => {
        barrier = {open: jest.fn()};
        paymentGateway = { process: jest.fn() };
        clock = { now: jest.fn() };
        guardNotifier = { notify: jest.fn() };
        parking = new Parking(barrier, paymentGateway, clock, guardNotifier);
    });

    it('opens the barrier when a new car enter', () => {
        parking.enter(ANY_PLATE);

        expect(barrier.open).toHaveBeenCalledTimes(1);
    });

    it('opens the barrier at exist when the payment is correct', () => {
        when(paymentGateway.process).calledWith(2).mockReturnValue(true);
        when(clock.now).mockReturnValue(new Date());

        parking.enter(ANY_PLATE);
        parking.exit(ANY_PLATE);

        expect(barrier.open).toHaveBeenCalledTimes(2);
    });

    it('does not opens the barrier at exist when the payment fails', () => {
        when(paymentGateway.process).mockReturnValue(false);

        parking.enter(ANY_PLATE);
        parking.exit(ANY_PLATE);

        expect(barrier.open).toHaveBeenCalledTimes(1);
        expect(guardNotifier.notify).toHaveBeenCalledWith(ANY_PLATE);
    });
});
