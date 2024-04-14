export function anAsset(): AssetsFileLineBuilder {
    return new AssetsFileLineBuilder();
}

export class AssetsFileLineBuilder {
    private dateAsString: string;
    private description: string;
    private value?: number;

    constructor() {
        this.dateAsString = "";
        this.description = "description";
        this.value = undefined;
    }

    public fromDate(date: string): AssetsFileLineBuilder {
        this.dateAsString = date;
        return this;
    };

    public describedAs(description: string): AssetsFileLineBuilder {
        this.description = description;
        return this;
    }

    public withValue(value: number): AssetsFileLineBuilder {
        this.value = value;
        return this;
    }

    public build(): string {
        const assetValue = this.value?.toString();
        return `${this.description},${this.dateAsString},${assetValue}`;
    }

}