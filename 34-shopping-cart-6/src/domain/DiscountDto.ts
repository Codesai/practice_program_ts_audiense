import {DiscountCode} from "./DiscountCode";

export class DiscountDto {
    readonly code: DiscountCode;
    readonly percentage: number;

    constructor(code: DiscountCode, percentage: number) {
        this.code = code;
        this.percentage = percentage;
    }

}