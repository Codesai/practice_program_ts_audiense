export class DiscountNotFoundException extends Error {
    constructor(message: string) {
        super(message);
    }
}