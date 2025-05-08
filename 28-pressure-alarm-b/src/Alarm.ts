import {Notifier} from "./Notifier";
import {Sensor} from "./Sensor";
import {SafetyRange} from "./SafetyRange";

export class Alarm{
    private readonly notifier: Notifier;
    private readonly sensor: Sensor;
    private readonly safeRange: SafetyRange;

    constructor(notifier: Notifier, sensor: Sensor, safeRange: SafetyRange) {
        this.notifier = notifier;
        this.sensor = sensor;
        this.safeRange = safeRange;
    }

    check(): void {
        if (this.sensor.measure() > this.safeRange.max || this.sensor.measure() < this.safeRange.min) {
            this.notifier.notify("activated")
        } else {
            this.notifier.notify("deactivated")
        }
    }
}
