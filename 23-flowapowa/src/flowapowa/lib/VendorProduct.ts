export class VendorProduct {
    private readonly _name: string
    private readonly _unitPrice: number

    constructor(name: string, unitPrice: number) {
        this._name = name
        this._unitPrice = unitPrice
    }

    get name(): string {
        return this._name
    }

    get unitPrice(): number {
        return this._unitPrice
    }
}
