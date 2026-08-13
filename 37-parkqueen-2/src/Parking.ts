import { Barrier } from './Barrier';
import { PaymentGateway } from './PaymentGateway';
import { Clock } from './Clock';
import { GuardNotifier } from './GuardNotifier';

export class Parking {
  private readonly barrier: Barrier;
  private readonly paymentGateway: PaymentGateway;
  private readonly clock: Clock;
  private readonly guardNotifier: GuardNotifier;

  constructor(barrier: Barrier, paymentGateway: PaymentGateway, clock: Clock, guard: GuardNotifier) {
    this.guardNotifier = guard;
    this.clock = clock;
    this.paymentGateway = paymentGateway;
    this.barrier = barrier;
  };

  enter(plate: string): void {
    this.barrier.open();
  }

  exit(plate: string) {
    if (this.paymentGateway.process(2)) {
      this.barrier.open();
    } else {
      this.guardNotifier.notify(plate);
    }
  }
}
