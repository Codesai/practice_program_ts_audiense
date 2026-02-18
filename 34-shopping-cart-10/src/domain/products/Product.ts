import {Percentage} from "../orders/Percentage";
import {Price} from "../orders/Price";

export class Product {
    private readonly name: string;
    private readonly cost: number;
    private readonly revenue: Percentage;
    private readonly tax: Percentage;

    constructor(name: string, cost: number, revenue: Percentage, tax: Percentage) {
        this.name = name;
        this.cost = cost;
        this.revenue = revenue;
        this.tax = tax;
    }

    finalPrice(): Price {
        return Price.of(this.applyTax(this.applyRevenue(this.cost)));
    }

    getName(): string {
        return this.name;
    }

    private applyRevenue(amount: number): number {
        return amount + this.revenue.calculateFor(amount);
    }

    private applyTax(amount: number): number {
        return amount + this.tax.calculateFor(amount);
    }
}
