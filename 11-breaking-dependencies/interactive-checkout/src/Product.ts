export class Product {
    private readonly _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public toString(): string {
        return this.getName();
    }

    getName(): string {
        return this._name;
    }
}