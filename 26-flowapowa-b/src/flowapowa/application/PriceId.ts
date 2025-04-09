export class PriceId {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    static from(name: string): PriceId {
        return new PriceId(name);
    }

    value(): string {
        return this.name;
    }
}