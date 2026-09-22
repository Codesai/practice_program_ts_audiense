import {Barrier} from './Barrier';
import {PaymentGateway} from './PaymentGateway';
import {Clock} from './Clock';
import {GuardNotifier} from './GuardNotifier';
import {FeesCalculator} from './FeesCalculator';
import {TimeInsideParking} from "./TimeInsideParking";
import {ParkingFee} from "./ParkingFee";

export class Parking {
    private readonly barrier: Barrier;
    private readonly paymentGateway: PaymentGateway;
    private readonly clock: Clock;
    private readonly guardNotifier: GuardNotifier;
    private readonly feesCalculator: FeesCalculator;
    private readonly entryTimeByCar: Map<string, Date>;

    constructor(barrier: Barrier, paymentGateway: PaymentGateway, clock: Clock, guard: GuardNotifier, feesCalculator: FeesCalculator) {
        this.guardNotifier = guard;
        this.clock = clock;
        this.paymentGateway = paymentGateway;
        this.barrier = barrier;
        this.feesCalculator = feesCalculator;
        this.entryTimeByCar = new Map<string, Date>();
    };

    enter(plate: string): void {
        if (this.iAlreadyRegistered(plate)) {
            this.notifyGuard(plate);
            return;
        }
        this.register(plate);
        this.openBarrier();
    }

    exit(plate: string): void {
        if (!this.iAlreadyRegistered(plate)) {
            this.notifyGuard(plate);
            return;
        }

        const timeInsideParking = this.computeTimeInsideParking(plate);
        const fee = this.feesCalculator.calculate(timeInsideParking);
        this.processFeePayment(fee, plate);
    }

    private computeTimeInsideParking(plate: string): TimeInsideParking {
        const exitTime = this.clock.now();
        const entryTime = this.entryTimeByCar.get(plate);
        return new TimeInsideParking(entryTime!, exitTime);
    }

    private processFeePayment(fee: ParkingFee, plate: string): void {
        if (fee.isFree() || this.paymentGateway.process(fee.amount)) {
            this.openBarrier()
        } else {
            this.notifyGuard(plate);
        }
    }

    private register(plate: string): void {
        this.entryTimeByCar.set(plate, this.clock.now())
    }

    private iAlreadyRegistered(plate: string): boolean {
        return this.entryTimeByCar.has(plate);
    }

    private notifyGuard(plate: string): void {
        this.guardNotifier.notify(plate);
    }

    private openBarrier(): void {
        this.barrier.open();
    }
}
