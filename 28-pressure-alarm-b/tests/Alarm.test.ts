import {Alarm} from "../src/Alarm"
import {Notifier} from "../src/Notifier"
import {Sensor} from "../src/Sensor"
import {SafetyRange} from "../src/SafetyRange";
import {Numbers} from "./NumbersHelper";

describe('About Alarm', () => {
    const lowestSafePressure = 17;
    const highestSafePressure = 21;
    const safetyRange: SafetyRange = {min: lowestSafePressure, max: highestSafePressure};
    let notifier: jest.Mocked<Notifier>;
    let sensor: jest.Mocked<Sensor>;
    let alarm: Alarm;

    beforeEach(() => {
        notifier = {notify: jest.fn()};
        sensor = {measure: jest.fn()};
        alarm = new Alarm(notifier, sensor, safetyRange);
    })

    it.each([tooLowPressure(), tooHighPressure()])
    ('A deactivated alarm gets activated and notifies its activation, when the measured pressure (%d) is not safe', (unsafePressure: number) => {
        sensor.measure.mockReturnValue(unsafePressure);
        alarm.check();

        expect(notifier.notify).toHaveBeenCalledTimes(1);
        expect(notifier.notify).toHaveBeenCalledWith("activated");
    })

    it.each([lowestSafePressure, highestSafePressure])
    ('An activated alarm gets deactivated and notifies its deactivation, when the measured pressure (%d) safe', (safePressure) => {
        sensor.measure.mockReturnValue(50000);
        alarm.check();
        sensor.measure.mockReturnValue(safePressure);

        alarm.check();

        expect(notifier.notify).toHaveBeenCalledTimes(2);
        expect(notifier.notify).toHaveBeenNthCalledWith(2, "deactivated");
    })

    function tooLowPressure() : number {
        return lowestSafePressure - Numbers.inRange0_1Excluding0();
    }

    function tooHighPressure() : number {
        return highestSafePressure + Numbers.inRange0_1Excluding0();
    }
})

