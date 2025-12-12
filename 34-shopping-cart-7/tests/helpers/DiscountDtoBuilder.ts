import {DiscountDto} from "../../src/domain/DiscountDto";
import {DiscountCode} from "../../src/domain/DiscountCode";


export function aDiscountDto(): DiscountDtoBuilder {
    return new DiscountDtoBuilder();
}

export class DiscountDtoBuilder {
    private discountCode: DiscountCode;
    private discountPercentage: number;

    build(): DiscountDto {
        return new DiscountDto(this.discountCode, this.discountPercentage);
    }

    withCode(code: string): this {
        this.discountCode = new DiscountCode(code);
        return this;
    }

    withPercentage(discountPercentage: number): this {
        this.discountPercentage = discountPercentage;
        return this;
    }
}