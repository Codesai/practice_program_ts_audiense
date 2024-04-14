import {Asset, MeasurableValue, PricelessValue} from "./Asset";
import * as fs from "fs";

export class Portfolio {
    private readonly _portfolioCsvPath: string;

    constructor(portfolioCsvPath: string) {
        this._portfolioCsvPath = portfolioCsvPath;
    }

    computePortfolioValue(): void {
        const now = this.getNow();
        const lines = this.getAssetLines();
        let portfolioValue = new MeasurableValue(0);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const columns = line.split(",");

            const [year, month, day] = columns[1].split("/");
            if ([year, month, day].some((value) => value === undefined)) {
                throw new Error("wrong date");
            }
            const date = this.createDate(year, month, day);

            const asset = new Asset(columns[0], date,
                columns[0] == "Unicorn" ? new PricelessValue() : new MeasurableValue(Number(columns[2])));

            if (Math.floor((asset.getDate().getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) < 0) {
                if (asset.getDescription() != "French Wine") {
                    if (asset.getDescription() != "Lottery Prediction") {
                        if (asset.getValue().get() > 0) {
                            if (asset.getDescription() != "Unicorn") {
                                asset.setValue(new MeasurableValue(asset.getValue().get() - 20));
                            } else {
                                this.displayMessage(
                                    "Portfolio is priceless because it got a unicorn on " +
                                    this.formatDate(asset) + "!!!!!");
                                return;
                            }
                        }
                    } else {
                        asset.setValue(new MeasurableValue(asset.getValue().get() - asset.getValue().get()));
                    }
                } else {
                    if (asset.getValue().get() < 200) {
                        asset.setValue(new MeasurableValue(asset.getValue().get() + 20));
                    }
                }
            } else {
                if (asset.getDescription() != "French Wine" && asset.getDescription() != "Lottery Prediction") {
                    if (asset.getValue().get() > 0.0) {
                        if (asset.getDescription() != "Unicorn") {
                            asset.setValue(new MeasurableValue(asset.getValue().get() - 10));
                        } else {
                            this.displayMessage("Portfolio is priceless because it got a unicorn on " + this.formatDate(asset) + "!!!!!");
                            return;
                        }
                    } else {
                        if (asset.getDescription() == "Unicorn") {
                            this.displayMessage("Portfolio is priceless because it got a unicorn on " + this.formatDate(asset) + "!!!!!");
                            return;
                        }
                    }
                } else {
                    if (asset.getDescription() == "Lottery Prediction") {
                        if (asset.getValue().get() < 800) {
                            asset.setValue(new MeasurableValue(asset.getValue().get() + 5));

                            if (Math.floor((asset.getDate().getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) < 11) {
                                if (asset.getValue().get() < 800) {
                                    asset.setValue(new MeasurableValue(asset.getValue().get() + 20));
                                }
                            }

                            if (Math.floor((asset.getDate().getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) < 6) {
                                if (asset.getValue().get() < 800) {
                                    asset.setValue(new MeasurableValue(asset.getValue().get() + 100));
                                }
                            }
                        }
                    } else {
                        if (asset.getValue().get() < 200) {
                            asset.setValue(new MeasurableValue(asset.getValue().get() + 10));
                        }
                    }
                }
            }
            portfolioValue = new MeasurableValue(portfolioValue.get() + asset.getValue().get());
        }
        this.displayMessage(portfolioValue.toString());
    }

    protected createDate(year: string, month: string, day: string): Date {
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        return date;
    }

    protected formatDate(asset: Asset): string {
        return asset.getDate().toString();
    }

    protected getAssetLines() {
        const readText = fs.readFileSync(this._portfolioCsvPath, {encoding: 'utf8'});
        return readText.split(/\r?\n/);
    }

    protected displayMessage(message: string) {
        console.log(message);
    }

    protected getNow() {
        return new Date();
    }
}
