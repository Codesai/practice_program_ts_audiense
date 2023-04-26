import {Rental} from "./Rental";

export class Customer {
    private readonly name: string;
    private rentals = Array<Rental>();

    constructor(name: string) {
        this.name = name;
    }

    public addRental(rental: Rental) {
        this.rentals.push(rental);
    }

    public statement(): string {
        let totalAmount = 0;
        let frequentRenterPoints = 0;
        const rentals = this.rentals.entries();
        let result = "Rental Record for " + this.name + "\n";

        for (const [index, rental] of rentals) {
            let thisAmount = 0;
            let amount = rental.calculateAmount();

            thisAmount += amount;
            frequentRenterPoints += rental.computeRenterPoints();

            result += "\t" + rental.getMovieTitle() + "\t"
                + new String(thisAmount.toFixed(1)) + "\n";
            totalAmount += thisAmount;

        }

        result += "You owed " + new String(totalAmount.toFixed(1)) + "\n";
        result += "You earned " + new String(frequentRenterPoints) + " frequent renter points\n";

        return result;
    }
}