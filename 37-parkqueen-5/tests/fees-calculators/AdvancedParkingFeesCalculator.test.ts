import {AdvancedParkingFeesCalculator as AdvancedParkingFeesCalculator} from '../../src/fees-calculators/AdvancedParkingFeesCalculator';
import {hoursInsideParkingFrom} from "../TestHelpers";
import {behaveLikeBasicFeesCalculator} from "./BehaveLikeBasicFeesCalculator";

const STARTING_MONDAY = '2026-09-14T00:00:00.000Z';
const STARTING_SATURDAY = '2026-09-19T00:00:00.000Z'
const MAX_WEEK_BILLABLE_HOURS = 24 * 5;
const GRACE_PERIOD = 10 / 60;
const ONE_MILLISECOND = 1 / 1000 / 60;

describe('AdvancedParkingFeesCalculator', () => {
    let parkingFeesCalculator: AdvancedParkingFeesCalculator;

    beforeEach(() => {
        parkingFeesCalculator = new AdvancedParkingFeesCalculator();
    });

    describe.each(
        [STARTING_MONDAY, STARTING_SATURDAY]
    )('During the grace period (10 minutes) is free starting: %s', (startDate) => {
        it.each([ONE_MILLISECOND, GRACE_PERIOD])('%f hours', (hours) => {
            const fee = parkingFeesCalculator.calculate(hoursInsideParkingFrom(hours, startDate));
            expect(fee.amount).toBe(0);
        });

        it('should calculate the fee for the minimum billable time', () => {
            const fee = parkingFeesCalculator.calculate(
                hoursInsideParkingFrom(
                    GRACE_PERIOD + ONE_MILLISECOND,
                    startDate
                )
            );
            expect(fee.amount).toBe(2);
        });
    });

    describe('during weekdays', () => {
        const billableMinimumTimeDuringTheWeek = hoursInsideParkingFrom(
            GRACE_PERIOD + ONE_MILLISECOND,
            STARTING_MONDAY
        );
        const billableMaximumTimeDuringTheWeek = hoursInsideParkingFrom(
            MAX_WEEK_BILLABLE_HOURS,
            STARTING_MONDAY
        );

        behaveLikeBasicFeesCalculator(
            () => new AdvancedParkingFeesCalculator(),
            (hours) => {
                if (hours <= GRACE_PERIOD) {
                    return billableMinimumTimeDuringTheWeek;
                }
                if (hours >= MAX_WEEK_BILLABLE_HOURS) {
                    return billableMaximumTimeDuringTheWeek;
                }
                return hoursInsideParkingFrom(hours, STARTING_MONDAY);
            }
        );
    });

    describe('during weekend', () => {

    });
});
