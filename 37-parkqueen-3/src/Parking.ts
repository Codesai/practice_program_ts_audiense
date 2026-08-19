import {Barrier} from './Barrier';
import {PaymentGateway} from './PaymentGateway';
import {Clock} from './Clock';
import {GuardNotifier} from './GuardNotifier';
import {FeesCalculator} from './FeesCalculator';
import {TimeInsideParking} from "./TimeInsideParking";

export class Parking {
  private readonly barrier: Barrier;
  private readonly paymentGateway: PaymentGateway;
  private readonly clock: Clock;
  private readonly guardNotifier: GuardNotifier;
  private feesCalculator: FeesCalculator;
  private entryTime: Date;

  constructor(barrier: Barrier, paymentGateway: PaymentGateway, clock: Clock, guard: GuardNotifier, feesCalculator: FeesCalculator) {
    this.guardNotifier = guard;
    this.clock = clock;
    this.paymentGateway = paymentGateway;
    this.barrier = barrier;
    this.feesCalculator = feesCalculator;
  };

  enter(plate: string): void {
    this.entryTime = this.clock.now();
    this.barrier.open();
  }

  exit(plate: string): void {
    const exitTime = this.clock.now();
    const fee = this.feesCalculator.calculate(new TimeInsideParking(this.entryTime, exitTime));

    if (this.paymentGateway.process(fee.amount)) {
      this.barrier.open();
    } else {
      this.guardNotifier.notify(plate);
    }
  }
}
