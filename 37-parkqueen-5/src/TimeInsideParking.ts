import {InvalidTimeInsideParking} from "./InvalidTimeInsideParking";

export class TimeInsideParking {
    readonly entryTime: Date;
    readonly exitTime: Date;

    constructor(entryTime: Date, exitTime: Date) {
        if (entryTime.getTime() >= exitTime.getTime()) {
            throw new InvalidTimeInsideParking('Entry time must be before exit time');
        }
        this.entryTime = entryTime;
        this.exitTime = exitTime;
    }

    inHours(): number {
        return (this.exitTime.getTime() - this.entryTime.getTime()) / (1000 * 60 * 60);
    }
}