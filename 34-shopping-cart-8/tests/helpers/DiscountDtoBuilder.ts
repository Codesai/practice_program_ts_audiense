import {DiscountDto, DiscountTypeDTO} from "../../src/domain/discounts/DiscountDto";
import {DiscountCode} from "../../src/domain/discounts/DiscountCode";


import {aDiscountCode} from "./DiscountCodeFactory";

export function aPercentageDiscountDTO(): DiscountDtoBuilder {
    return aDiscountDto().withType(DiscountTypeDTO.PERCENTAGE);
}

export function aFixedDiscountDTO(): DiscountDtoBuilder {
    return aDiscountDto().withType(DiscountTypeDTO.FIXED);
}

export function aNoDiscountDto(): DiscountDtoBuilder {
    return aDiscountDto();
}

export class DiscountDtoBuilder {
    private discountCode: DiscountCode;
    private value: number;
    private discountType: DiscountTypeDTO;

    constructor() {
        this.discountCode = aDiscountCode("NO_DISCOUNT");
        this.value = 0;
        this.discountType = DiscountTypeDTO.FIXED;
    }

    build(): DiscountDto {
        return new DiscountDto(this.discountCode, this.value, this.discountType);
    }

    withCode(code: string): this {
        this.discountCode = aDiscountCode(code);
        return this;
    }

    withValue(value: number): this {
        this.value = value;
        return this;
    }

    withType(discountType: DiscountTypeDTO): this {
        this.discountType = discountType;
        return this;
    }
}

function aDiscountDto(): DiscountDtoBuilder {
    return new DiscountDtoBuilder();
}