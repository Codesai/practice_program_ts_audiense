import {Portfolio} from "../src/Portfolio";
import {Asset} from "../src/Asset";

export class TestingPortfolio extends Portfolio {
    messages: string[] = [];
    private readonly date: Date;
    private readonly assetLines: string[];

    public constructor(assetLines: string[], date: Date) {
        super("");
        this.date = date;
        this.assetLines = assetLines;
    }

    protected getNow(): Date {
        return this.date;
    }

    protected displayMessage(message: string): void {
        this.messages.push(message);
    }

    protected getAssetLines(): string[] {
        return this.assetLines;
    }

    protected formatDate(asset: Asset): string {
        return asset.getDate().toUTCString();
    }

    protected createDate(year: string, month: string, day: string): Date {
        // all dates are UTC
        return new Date(
            Date.UTC(
                Number.parseInt(year),
                Number.parseInt(month) - 1,
                Number.parseInt(day),
                0, 0, 0,
                0));
    }
}