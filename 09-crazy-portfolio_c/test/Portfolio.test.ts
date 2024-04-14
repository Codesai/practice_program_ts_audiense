import {anEmptyPortFolio, aPortFolio} from "./TestingPortFolioBuilder";
import {anAsset} from "./AssetsFileLineBuilder";

describe("Portfolio", () => {
    describe("displays its value", () => {
        describe("with one asset:", () => {
            describe("Lottery Prediction", () => {
                it("before now value drops to 0", () => {
                    const portfolio = aPortFolio()
                        .with(anAsset().describedAs("Lottery Prediction").fromDate("2024/04/15").withValue(50))
                        .onDate('2025/01/01')
                        .build();

                    portfolio.computePortfolioValue();

                    expect(portfolio.messages[0]).toEqual("0")
                });

                describe("not before now", () => {
                    it("11 days or more value grows by 5", () => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("Lottery Prediction").fromDate("2024/04/15").withValue(50))
                            .onDate('2024/01/01')
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual("55")
                    });

                    it("less than 11 days value grows by 25", () => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("Lottery Prediction").fromDate("2024/04/14").withValue(50))
                            .onDate('2024/04/04')
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual("75");
                    });

                    it("less than 6 days  value grows by 125", () => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("Lottery Prediction").fromDate("2024/04/09").withValue(50))
                            .onDate('2024/04/04')
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual("175");
                    });

                    it("value can not be more than 800", () => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("Lottery Prediction").fromDate("2024/04/15").withValue(800))
                            .onDate('2024/04/09')
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual("800");
                    });
                });
            });

            describe("French Wine", () => {
                describe("before now", () => {
                    it.each([
                        [100],
                        [199] // off point
                    ])("value grows by 20 if it's less than 200", (value: number) => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("French Wine").fromDate("2024/01/15").withValue(value))
                            .onDate('2025/01/01')
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual(`${value + 20}`);
                    });
                    it.each([
                        [200], // on point
                        [201]
                    ])("value remains the same if it's 200 or more", (value: number) => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("French Wine").fromDate("2024/01/15").withValue(value))
                            .onDate('2025/01/01')
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual(`${value}`);
                    });
                });

                it("after now value grows by 10", () => {
                    const portfolio = aPortFolio()
                        .with(anAsset().describedAs("French Wine").fromDate("2024/01/15").withValue(100))
                        .onDate('2024/01/01')
                        .build();

                    portfolio.computePortfolioValue();

                    expect(portfolio.messages[0]).toEqual("110");
                });
            });

            describe("Unicorn", () => {
                it("before now value is infinite", () => {
                    const portfolio = aPortFolio()
                        .with(anAsset().describedAs("Unicorn").fromDate("2023/01/15").withValue(80))
                        .onDate('2024/01/01')
                        .build();

                    portfolio.computePortfolioValue();

                    expect(portfolio.messages[0]).toEqual("Portfolio is priceless because it got a unicorn on Sun, 15 Jan 2023 00:00:00 GMT!!!!!");
                });

                it("not before now value is infinite", () => {
                    const portfolio = aPortFolio()
                        .with(anAsset().describedAs("Unicorn").fromDate("2024/01/15").withValue(80))
                        .onDate('2024/01/15')
                        .build();

                    portfolio.computePortfolioValue();

                    expect(portfolio.messages[0]).toEqual("Portfolio is priceless because it got a unicorn on Mon, 15 Jan 2024 00:00:00 GMT!!!!!")
                });
            });

            describe("any other asset", () => {

                describe("before now", () => {
                    const valueComputationDate = '2025/04/09';
                    it.each([
                        ["2024/04/15"],
                        ["2025/04/08"] // off point
                    ])('with values greater than zero decrease by 20', (assetDate: string) => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("Another asset").fromDate(assetDate).withValue(189))
                            .onDate(valueComputationDate)
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual("169");
                    });

                    it('with value zero remains the same', () => {
                        const assetValue = 0;
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("Another asset").fromDate("2025/04/08").withValue(assetValue))
                            .onDate(valueComputationDate)
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual(`${assetValue}`);
                    });
                });

                describe("not before now", () => {
                    it.each([
                        ["2024/04/15"],
                        ['2024/04/09'] // on point
                    ])('value decreases by 10', (assetDate: string) => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("Another asset").fromDate(assetDate).withValue(30))
                            .onDate('2024/04/09')
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual("20")
                    });

                    it('value 0 remains the same', () => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("Some Regular Asset").fromDate("2023/01/01").withValue(0))
                            .onDate("2023/01/01")
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual("0")
                    });
                });
            });
        });

        describe("with several assets:", () => {
            it('including a Unicorn only the unicorn matters', () => {
                const portfolio = aPortFolio()
                    .with(anAsset().describedAs("French Wine").fromDate("2024/01/15").withValue(100))
                    .with(anAsset().describedAs("Unicorn").fromDate("2024/01/15").withValue(100))
                    .onDate('2025/01/01')
                    .build();

                portfolio.computePortfolioValue();

                expect(portfolio.messages).toEqual(["Portfolio is priceless because it got a unicorn on Mon, 15 Jan 2024 00:00:00 GMT!!!!!"]);
            });

            it('not including a Unicorn sums the value of all assets', () => {
                const portfolio = aPortFolio()
                    .with(anAsset().describedAs("French Wine").fromDate("2024/01/15").withValue(100))
                    .with(anAsset().describedAs("Cus cus").fromDate("2024/01/15").withValue(100))
                    .onDate('2025/01/01')
                    .build();

                portfolio.computePortfolioValue();

                expect(portfolio.messages).toEqual(["200"]);
            });
        });
    });

    describe("fails", () => {
        it('when the portfolio contains no assets', () => {
            const portfolio = anEmptyPortFolio()
                .onDate('2025/01/01')
                .build();

            expect(() => portfolio.computePortfolioValue()).toThrowError();
        });

        it('when an asset has invalid data', () => {
            const portfolio = aPortFolio()
                .with(anAsset().describedAs("Another asset").fromDate("2024/15").withValue(0))
                .onDate('2025/01/01')
                .build();

            expect(() => portfolio.computePortfolioValue()).toThrowError();
        });
    });
});