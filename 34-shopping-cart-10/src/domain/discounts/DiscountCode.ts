export class DiscountCode {
    readonly text: string;

    constructor(code: string) {
        this.text = code;
    }

    static noDiscount(): DiscountCode {
        return new DiscountCode('NO_DISCOUNT');
    }
}