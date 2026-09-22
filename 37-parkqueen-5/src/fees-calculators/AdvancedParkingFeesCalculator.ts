import {TimeInsideParking} from "../TimeInsideParking";
import {FeesCalculator} from '../FeesCalculator';
import {ParkingFee} from "../ParkingFee";
import {BasicFeesCalculator} from "./BasicFeesCalculator";

export class AdvancedParkingFeesCalculator implements FeesCalculator {
    private readonly maxGracePeriod: number = 10 / 60;
    private readonly parkingFeesCalculator = new BasicFeesCalculator();

    calculate(duration: TimeInsideParking): ParkingFee {
        if (duration.inHours() <= this.maxGracePeriod) {
            return new ParkingFee(0);
        }

        return this.parkingFeesCalculator.calculate(duration);
    }

}
