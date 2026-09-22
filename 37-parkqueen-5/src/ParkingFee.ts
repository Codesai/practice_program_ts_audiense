import {InvalidParkingFee} from "./InvalidParkingFee";

export class ParkingFee {
    readonly amount: number;

    constructor(amount: number) {
        if (amount < 0) {
            throw new InvalidParkingFee('Fees cannot be negative');
        }
        this.amount = amount;
    }

    isFree(): boolean {
        return this.amount === 0
    }
}