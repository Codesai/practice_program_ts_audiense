import {BasicFeesCalculator} from '../../src/fees-calculators/BasicFeesCalculator';
import {hoursInsideParking} from "../TestHelpers";
import {behaveLikeBasicFeesCalculator} from "./BehaveLikeBasicFeesCalculator";

describe('BasicFeesCalculator', () => {
    behaveLikeBasicFeesCalculator(
        () => new BasicFeesCalculator(),
        hoursInsideParking
    );
});
