import {TimeInsideParking} from "../src/TimeInsideParking";
import {ParkingFee} from "../src/ParkingFee";

export function hoursInsideParking(hours: number): TimeInsideParking {
    const entryTime = new Date();
    const exitTime = addHoursTo(entryTime, hours);
    return new TimeInsideParking(entryTime, exitTime);
}


export function addHoursTo(enterTime: Date, hours: number): Date {
    const millisecondsPerHour = 1000 * 60 * 60;
    return new Date(enterTime.getTime() + millisecondsPerHour * hours);
}

export function parkingFeeOf(amount: number): ParkingFee {
    return new ParkingFee(amount);
}

export function hoursInsideParkingFrom(hours: number, startDate: string) {
    const entryTime = new Date(startDate);
    const exitTime = addHoursTo(entryTime, hours);
    return new TimeInsideParking(entryTime, exitTime);
}