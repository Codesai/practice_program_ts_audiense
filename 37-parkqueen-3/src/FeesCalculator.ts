import {ParkingFee} from "./ParkingFee";
import {TimeInsideParking} from "./TimeInsideParking";

export interface FeesCalculator {
  calculate(duration: TimeInsideParking): ParkingFee;
}
