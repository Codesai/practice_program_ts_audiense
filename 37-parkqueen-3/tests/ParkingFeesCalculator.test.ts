import {ParkingFeesCalculator} from '../src/ParkingFeesCalculator';
import {hoursInsideParking} from "./TestHelpers";

describe('ParkingFeesCalculator', () => {
  let parkingFeesCalculator: ParkingFeesCalculator;

  beforeEach(() => {
    parkingFeesCalculator = new ParkingFeesCalculator();
  })

  it('should calculate the fee for less that 1 hour', () => {
    const fee = parkingFeesCalculator.calculate(hoursInsideParking(1))

    expect(fee.amount).toBe(2);
  });

  it('should calculate the fee for up 1 to hour', () => {
    const fee = parkingFeesCalculator.calculate(hoursInsideParking(2))

    expect(fee.amount).toBe(3);
  })

  // still some missing test cases
});
