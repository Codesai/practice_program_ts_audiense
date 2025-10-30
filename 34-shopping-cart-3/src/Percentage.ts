export class Percentage {
    private readonly amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    calculateFor(value: number) {
        return value * this.amount / 100;
    }
}
