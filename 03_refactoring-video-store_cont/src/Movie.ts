export class Movie {
    public static CHILDRENS: number = 2;
    public static REGULAR: number = 0;
    public static NEW_RELEASE: number = 1;

    private readonly title: string;
    private readonly priceCode: number;

    constructor(title: string, priceCode: number) {
        this.title = title;
        this.priceCode = priceCode;
    }

    public computeAmount(daysRented: number): number {
        let amount = 0;
        switch (this.priceCode) {
            case Movie.REGULAR:
                amount = 2;
                if (daysRented > 2) {
                    amount += (daysRented - 2) * 1.5;
                }
                break;
            case Movie.NEW_RELEASE:
                amount = daysRented * 3;
                break;
            case Movie.CHILDRENS:
                amount = 1.5;
                if (daysRented > 3) {
                    amount += (daysRented - 3) * 1.5;
                }
                break;
        }
        return amount;
    }

    public computeRenterPoints(daysRented: number) {
        if (this.priceCode == Movie.NEW_RELEASE
            && daysRented > 1) {
            return 2;
        }
        return 1;
    }

    public getTitle(): string {
        return this.title;
    }
}