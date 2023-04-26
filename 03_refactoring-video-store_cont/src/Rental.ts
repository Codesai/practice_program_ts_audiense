import {Movie} from "./Movie";

export class Rental {
    private readonly movie: Movie;
    private readonly daysRented: number;

    constructor(movie: Movie, daysRented: number) {
        this.movie = movie;
        this.daysRented = daysRented;
    }

    public calculateAmount(): number {
        return this.movie.computeAmount(this.daysRented);
    }

    public computeRenterPoints() {
        return this.computeMovieRenterPoints(this.daysRented);
    }

    public getMovieTitle() {
        return this.movie.getTitle();
    }

    private computeMovieRenterPoints(daysRented: number) {
        return this.movie.computeRenterPoints(daysRented);
    }
}