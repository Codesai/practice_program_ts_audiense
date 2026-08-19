import {TimeInsideParking} from "./TimeInsideParking";
import {FeesCalculator} from './FeesCalculator';
import {ParkingFee} from "./ParkingFee";

export class ParkingFeesCalculator implements FeesCalculator {
  calculate(duration: TimeInsideParking): ParkingFee {
    const amount = duration.inHours() <= 1 ? 2 : 3;
    return new ParkingFee(amount);
  }
}
