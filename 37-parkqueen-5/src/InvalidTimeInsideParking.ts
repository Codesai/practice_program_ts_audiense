export class InvalidTimeInsideParking implements Error {
    message: string;
    name: string;

    constructor(message: string) {
        this.message = message;
    }
}