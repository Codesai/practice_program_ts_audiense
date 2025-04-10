export class Price {
    private readonly amount: number;

    constructor(number: number) {
        this.amount = number;
    }

    value(): number {
        return this.amount;
    }
}
