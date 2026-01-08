import {DiscountDto, DiscountTypeDTO} from "../../src/domain/discounts/DiscountDto";
import {DiscountCode} from "../../src/domain/discounts/DiscountCode";


import {aDiscountCode} from "./DiscountCodeFactory";

export function aPercentageDiscountDTO(): DiscountDtoBuilder {
    return aDiscountDto().withType(DiscountTypeDTO.PERCENTAGE);
}

export function aFixedDiscountDTO(): DiscountDtoBuilder {
    return aDiscountDto().withType(DiscountTypeDTO.FIXED);
}

export class DiscountDtoBuilder {
    private discountCode: DiscountCode;
    private discountPercentage: number;
    private discountType: DiscountTypeDTO;

    build(): DiscountDto {
        return new DiscountDto(this.discountCode, this.discountPercentage, this.discountType);
    }

    withCode(code: string): this {
        this.discountCode = aDiscountCode(code);
        return this;
    }

    withValue(discountPercentage: number): this {
        this.discountPercentage = discountPercentage;
        return this;
    }

    withType(discountType: DiscountTypeDTO) {
        this.discountType = discountType;
        return this;
    }
}

function aDiscountDto(): DiscountDtoBuilder {
    return new DiscountDtoBuilder();
}