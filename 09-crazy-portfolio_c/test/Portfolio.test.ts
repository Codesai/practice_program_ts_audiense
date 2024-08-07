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
                    it.each([
                        ["2024/04/18"], // 14 days
                        ["2024/04/15"], // 11 days, on point for days boundary between [6, 11) y [11, +inf]
                    ])("11 days or more value grows by 5", (assetDate: string) => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("Lottery Prediction").fromDate(assetDate).withValue(50))
                            .onDate('2024/04/04')
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual("55")
                    });

                    describe.each([
                        ["2024/04/14"], // 10 days, off point for days boundary between [6, 11) and [11, +inf]
                        ["2024/04/10"]  // 6 days, on point for days boundary between [0, 6) and [6, 11)
                    ])("less than 11 days", (assetDate: string) => {
                        const valueComputationDate = '2024/04/04';
                        it.each([
                            [50],
                            [794], // off point for value of asset boundary between (-inf, 795) and [795, +inf] (for less than 11 days)
                        ])("value grows by 25 if value < 795", (value: number)=> {
                            const portfolio = aPortFolio()
                                .with(anAsset().describedAs("Lottery Prediction").fromDate(assetDate).withValue(value))
                                .onDate(valueComputationDate)
                                .build();

                            portfolio.computePortfolioValue();

                            expect(portfolio.messages[0]).toEqual(`${value + 25}`);
                        });

                        it.each([
                            [795], // on point for value of asset boundary between (-inf, 795) and [795, +inf] (for less than 11 days)
                            [800],
                        ])("value remains the same for values >= 795", (value: number)=> {
                            const portfolio = aPortFolio()
                                .with(anAsset().describedAs("Lottery Prediction").fromDate(assetDate).withValue(value))
                                .onDate(valueComputationDate)
                                .build();

                            portfolio.computePortfolioValue();

                            expect(portfolio.messages[0]).toEqual("800");
                        });
                    });

                    describe("less than 6 days", () => {
                        const assetDate = "2024/04/09"; // 5 days, off point for days boundary between [0, 6) and [6, 11)
                        const valueComputationDate = '2024/04/04';

                        it.each([
                            [50],
                            [774], // off point for value of asset boundary between (-inf, 775) and [775, 800) (for less than 6 days)
                        ])("value grows by 125 for values less than 775", (assetValue: number)=>{
                            const portfolio = aPortFolio()
                                .with(anAsset().describedAs("Lottery Prediction").fromDate(assetDate).withValue(assetValue))
                                .onDate(valueComputationDate)
                                .build();

                            portfolio.computePortfolioValue();

                            expect(portfolio.messages[0]).toEqual(`${assetValue + 125}`);
                        });

                        it.each([
                            [775], // on point for value of asset boundary between (-inf, 775) and [775, 800) (for less than 6 days)
                            [779], // off point for value of asset boundary between [775, 800) and [800, +inf] (for less than 6 days)
                        ])("value grows by 25 for values [775, 800)", (assetValue: number)=>{
                            const portfolio = aPortFolio()
                                .with(anAsset().describedAs("Lottery Prediction").fromDate(assetDate).withValue(assetValue))
                                .onDate(valueComputationDate)
                                .build();

                            portfolio.computePortfolioValue();

                            expect(portfolio.messages[0]).toEqual(`${assetValue + 25}`);
                        });

                        it.each([
                            [800], // on point for value of asset boundary between [775, 800) and [800, +inf] (for less than 6 days)
                            [850],
                        ])("value remains the same for values >= 800", (assetValue: number)=>{
                            const portfolio = aPortFolio()
                                .with(anAsset().describedAs("Lottery Prediction").fromDate(assetDate).withValue(assetValue))
                                .onDate(valueComputationDate)
                                .build();

                            portfolio.computePortfolioValue();

                            expect(portfolio.messages[0]).toEqual(`${assetValue}`);
                        });
                    });
                });
            });

            describe("French Wine", () => {
                describe.each([
                    [100],
                    [199] // off point for value of asset boundary between (-inf, 200) and [200, +inf)
                ])("when its value is less than 200", (value: number) => {
                    it("it grows by 20 before now", () => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("French Wine").fromDate("2024/01/15").withValue(value))
                            .onDate('2025/01/01')
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual(`${value + 20}`);
                    });

                    it("it grows by 10 after now", () => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("French Wine").fromDate("2024/01/15").withValue(value))
                            .onDate('2024/01/01')
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual(`${value + 10}`);
                    });
                });

                describe.each([
                    [200], // on point for value of asset boundary between (-inf, 200) and [200, +inf)
                    [201]
                ])("when its value is 200 or more it remains the same before and after now", (value: number) => {
                    const valueComputationDate = '2025/01/01';

                    it.each([
                        ["2024/01/15"], // before
                        ["2025/01/15"]  // after
                    ])(`Computation date: ${valueComputationDate}, Asset date: %s, Asset value: ${value}`, (assetDate: string) => {
                        const portfolio = aPortFolio()
                            .with(anAsset().describedAs("French Wine").fromDate(assetDate).withValue(value))
                            .onDate(valueComputationDate)
                            .build();

                        portfolio.computePortfolioValue();

                        expect(portfolio.messages[0]).toEqual(`${value}`);
                    });
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
                        ["2025/04/08"] // 1 day, off point for days boundary between before and after
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
                        ['2024/04/09'] // 0 days, on point for days boundary between before and after
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