import {Product} from "../src/Product";
import {Percentage} from "../src/Percentage";

export function aProduct(): ProductBuilder {
    return new ProductBuilder();
}

class ProductBuilder {
    private name: string = "Default Product";
    private cost: number = 100;
    private revenue: Percentage = new Percentage(0);
    private tax: Percentage = new Percentage(0);

    named(name: string): ProductBuilder {
        this.name = name;
        return this;
    }

    thatCosts(cost: number): ProductBuilder {
        this.cost = cost;
        return this;
    }

    withNoRevenue(): ProductBuilder {
        return this.withRevenuePercentage(0);
    }

    withNoTaxes(): ProductBuilder {
        return this.withTaxPercentage(0);
    }

    withRevenuePercentage(revenuePercentage: number): ProductBuilder {
        this.revenue = new Percentage(revenuePercentage);
        return this;
    }

    withTaxPercentage(taxPercentage: number): ProductBuilder {
        this.tax = new Percentage(taxPercentage);
        return this;
    }

    build(): Product {
        return new Product(
            this.name,
            this.cost,
            this.revenue,
            this.tax
        );
    }
}
