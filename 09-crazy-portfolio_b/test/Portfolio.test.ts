import {anEmptyPortFolio, aPortFolio} from "./TestingPortFolioBuilder";
import {anAsset} from "./AssetsFileLineBuilder";

describe("Portfolio", () => {
    describe("displays its value", () => {
        describe("with one asset:", () => {
            describe("Lottery Prediction", () => {
                it("before now", () => {
                    const portfolio = aPortFolio()
                        .with(anAsset().describedAs("Lottery Prediction").fromDate("2024/04/15").withValue(50))
                        .onDate('2025/01/01')
                        .build();

                    portfolio.computePortfolioValue();

                    expect(portfolio.messages[0]).toEqual("0")
                });

                describe("not before now", () => {
                    it("11 days or more", () => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("Lottery Prediction").fromDate("2024/04/15").withValue(50))
                            .onDate('2024/01/01')
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual("55")
                    });

                    it("less than 11 days", () => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("Lottery Prediction").fromDate("2024/04/14").withValue(50))
                            .onDate('2024/04/04')
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual("75");
                    });

                    it("less than 6 days", () => {
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
                it("before now", () => {
                    const portfolio = aPortFolio()
                        .with(anAsset().describedAs("French Wine").fromDate("2024/01/15").withValue(100))
                        .onDate('2025/01/01')
                        .build();

                    portfolio.computePortfolioValue();

                    expect(portfolio.messages[0]).toEqual("120");
                });

                it("after now", () => {
                    const portfolio = aPortFolio()
                        .with(anAsset().describedAs("French Wine").fromDate("2024/01/15").withValue(100))
                        .onDate('2024/01/01')
                        .build();

                    portfolio.computePortfolioValue();

                    expect(portfolio.messages[0]).toEqual("110");
                });
            });

            describe("Unicorn", () => {
                it("before now", () => {
                    const portfolio = aPortFolio()
                        .with(anAsset().describedAs("Unicorn").fromDate("2023/01/15").withValue(80))
                        .onDate('2024/01/01')
                        .build();

                    portfolio.computePortfolioValue();

                    expect(portfolio.messages[0]).toEqual("Portfolio is priceless because it got a unicorn on Sun, 15 Jan 2023 00:00:00 GMT!!!!!");
                });

                it("not before now", () => {
                    const portfolio = aPortFolio()
                        .with(anAsset().describedAs("Unicorn").fromDate("2024/01/15").withValue(80))
                        .onDate('2024/01/15')
                        .build();

                    portfolio.computePortfolioValue();

                    expect(portfolio.messages[0]).toEqual("Portfolio is priceless because it got a unicorn on Mon, 15 Jan 2024 00:00:00 GMT!!!!!")
                });
            });

            describe("any other asset", () => {
                it('before now', () => {
                    const portfolio = aPortFolio()
                        .with(anAsset().describedAs("Another asset").fromDate("2024/04/15").withValue(189))
                        .onDate('2025/04/09')
                        .build();

                    portfolio.computePortfolioValue();

                    expect(portfolio.messages[0]).toEqual("169");
                });

                it('not before now', () => {
                    const portfolio = aPortFolio()
                        .with(anAsset().describedAs("Another asset").fromDate("2024/04/15").withValue(30))
                        .onDate('2024/04/09')
                        .build();

                    portfolio.computePortfolioValue();

                    expect(portfolio.messages[0]).toEqual("20")
                });

            });
        });

        describe("with several asset:", () => {
            it('including a Unicorn', () => {
                const portfolio = aPortFolio()
                    .with(anAsset().describedAs("French Wine").fromDate("2024/01/15").withValue(100))
                    .with(anAsset().describedAs("Unicorn").fromDate("2024/01/15").withValue(100))
                    .onDate('2025/01/01')
                    .build();

                portfolio.computePortfolioValue();

                expect(portfolio.messages).toEqual(["Portfolio is priceless because it got a unicorn on Mon, 15 Jan 2024 00:00:00 GMT!!!!!"]);
            });

            it('not including a Unicorn', () => {
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

    describe("throws an error", () => {
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