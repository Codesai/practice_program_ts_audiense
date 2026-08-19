export class InvalidTimeInsideParking implements Error {
    constructor(message: string) {
        this.message = message;
    }

    message: string;
    name: string;
}