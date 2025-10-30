import { Percentage } from "./Percentage";

export class Product {
    readonly name: string;
    private readonly cost: number;
    private readonly revenue: Percentage;
    private readonly tax: Percentage;


    constructor(name: string, cost: number, revenue: Percentage, tax: Percentage) {
        this.name = name;
        this.cost = cost;
        this.revenue = revenue;
        this.tax = tax;
    }

    finalPrice(): number {
        return this.roundUp(this.applyTax(this.applyRevenue(this.cost)));
    }

    private applyRevenue(amount: number): number {
        return amount + this.revenue.calculateFor(amount);
    }

    private applyTax(amount: number): number {
        return amount + this.tax.calculateFor(amount);
    }

    private roundUp(value: number) {
        return Math.ceil(value * 100) / 100;
    }
}