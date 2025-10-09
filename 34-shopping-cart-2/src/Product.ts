export class Product {
    readonly name: string;
    readonly cost: number;
    private readonly revenue: number;
    private readonly tax: number;

    constructor(name: string, cost: number, revenue: number, tax: number) {
        this.name = name;
        this.cost = cost;
        this.revenue = revenue;
        this.tax = tax;
    }
}
