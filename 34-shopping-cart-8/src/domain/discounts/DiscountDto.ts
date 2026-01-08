import {DiscountCode} from "./DiscountCode";

export enum DiscountTypeDTO {
    PERCENTAGE,
    FIXED
}

export class DiscountDto {
    readonly code: DiscountCode;
    readonly value: number;
    readonly type: DiscountTypeDTO;

    constructor(code: DiscountCode, value: number, type: DiscountTypeDTO) {
        this.code = code;
        this.value = value;
        this.type = type;
    }

    static fixed(code: DiscountCode, value: number): DiscountDto {
        return new DiscountDto(code, value, DiscountTypeDTO.FIXED);
    }

    static percentage(code: DiscountCode, value: number): DiscountDto {
        return new DiscountDto(code, value, DiscountTypeDTO.PERCENTAGE);
    }
}
