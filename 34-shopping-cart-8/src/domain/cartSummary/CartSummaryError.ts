import {ErrorType} from "./ErrorType";

export class CartSummaryError {
    readonly info: string;
    readonly errorType: ErrorType;

    constructor(errorType: ErrorType, message: string) {
        this.errorType = errorType;
        this.info = message;
    }
}