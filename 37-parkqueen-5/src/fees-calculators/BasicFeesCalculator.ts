import {TimeInsideParking} from "../TimeInsideParking";
import {FeesCalculator} from '../FeesCalculator';
import {ParkingFee} from "../ParkingFee";

export class BasicFeesCalculator implements FeesCalculator {
    calculate(duration: TimeInsideParking): ParkingFee {
        const amount = this.computeAmount(duration.inHours());
        return new ParkingFee(amount);
    }

    private computeAmount(hours: number): number {
        const amountPerDay = 9;
        const hoursPerDay = 24;

        if (hours > 7 && hours <= hoursPerDay) {
            return amountPerDay;
        }

        if (hours > hoursPerDay) {
            const extraHours = hours - hoursPerDay;
            return amountPerDay + this.computeAmount(extraHours)
        }

        return Math.ceil(hours) + 1;
    }
}
