export class Percentage {
    private readonly amount: number;

    constructor(amount: number) {
        this.amount = Math.min(100, Math.max(0, amount));
    }

    calculateFor(value: number): number {
        return value * this.amount / 100;
    }

    value(): number {
        return this.amount;
    }
}
