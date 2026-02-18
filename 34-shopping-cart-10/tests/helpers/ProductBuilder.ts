import {Product} from "../../src/domain/products/Product";
import {Percentage} from "../../src/domain/orders/Percentage";
import {aPercentageOf} from "./PercentageFactory";

export function aProduct(): ProductBuilder {
    return new ProductBuilder();
}

class ProductBuilder {
    private name: string;
    private cost: number;
    private revenue: Percentage;
    private tax: Percentage;

    constructor() {
        this.name = "Default Product";
        this.cost = 100;
        this.revenue = aPercentageOf(0);
        this.tax = aPercentageOf(0);
    }

    build(): Product {
        return new Product(this.name, this.cost, this.revenue, this.tax);
    }

    named(name: string): this {
        this.name = name;
        return this;
    }

    thatCosts(cost: number): this {
        this.cost = cost;
        return this;
    }

    withNoRevenue(): this {
        return this.withRevenuePercentage(0);
    }

    withNoTaxes(): this {
        return this.withTaxPercentage(0);
    }

    withRevenuePercentage(revenuePercentage: number): this {
        this.revenue = aPercentageOf(revenuePercentage);
        return this;
    }

    withTaxPercentage(taxPercentage: number): this {
        this.tax = aPercentageOf(taxPercentage);
        return this;
    }
}
