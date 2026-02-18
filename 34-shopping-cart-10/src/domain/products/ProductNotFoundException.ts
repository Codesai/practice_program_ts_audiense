export class ProductNotFoundException extends Error {
    constructor(message: string) {
        super(message);
    }
}