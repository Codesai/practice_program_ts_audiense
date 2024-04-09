import {Portfolio} from "../src/Portfolio";

describe("Portfolio", () => {
    it('handles two assets', () => {
        const portfolio = aPortFolioForTesting()
            .withAsset("French Wine,2024/1/15,100")
            .withAsset("Unicorn,2024/1/15,100")
            .onDate('2025-01-01')
            .build();

        portfolio.computePortfolioValue();

        expect(portfolio.messages).toEqual(["Portfolio is priceless because it got a unicorn on Mon Jan 15 2024 00:00:00 GMT+0000 (Western European Standard Time)!!!!!"])
    });

    describe("asset before now", () => {
        it("display a portfolio", () => {
            const portfolio = aPortFolioForTesting()
                .withAsset("French Wine,2024/1/15,100")
                .onDate('2025-01-01')
                .build();

            portfolio.computePortfolioValue();

            expect(portfolio.messages[0]).toEqual("120");
        });

        it("handles unicorns", () => {
            const portfolio = aPortFolioForTesting()
                .withAsset("Unicorn,2024/1/15,80")
                .onDate('2025-01-01')
                .build();

            portfolio.computePortfolioValue();

            expect(portfolio.messages[0]).toEqual('Portfolio is priceless because it got a unicorn on Mon Jan 15 2024 00:00:00 GMT+0000 (Western European Standard Time)!!!!!')
        });

        it("handles Lottery", () => {
            const portfolio = aPortFolioForTesting()
                .withAsset("Lottery Prediction,2024/4/15,50")
                .onDate('2025-01-01')
                .build();

            portfolio.computePortfolioValue();

            expect(portfolio.messages[0]).toEqual("0")
        });

        it.each([[199, "179"], [200, "180"]])('Another asset with value %p', (value, expected) => {
            const portfolio = aPortFolioForTesting()
                .withAsset(`Another asset,2024/4/15,${value}`)
                .onDate('2025-04-09')
                .build();

            portfolio.computePortfolioValue();

            expect(portfolio.messages[0]).toEqual(expected);
        });
    })

    describe("asset after now", () => {
        it("display a portfolio", () => {
            const portfolio = aPortFolioForTesting()
                .withAsset("French Wine,2024/1/15,100")
                .onDate('2024-01-01')
                .build();

            portfolio.computePortfolioValue();

            expect(portfolio.messages[0]).toEqual("110");
        });

        it("handles unicorns", () => {
            const portfolio = aPortFolioForTesting()
                .withAsset("Unicorn,2024/1/15,80")
                .onDate('2024-01-01')
                .build();

            portfolio.computePortfolioValue();

            expect(portfolio.messages[0]).toEqual('Portfolio is priceless because it got a unicorn on Mon Jan 15 2024 00:00:00 GMT+0000 (Western European Standard Time)!!!!!')
        });

        describe("Lottery", () => {
            it("handles Lottery", () => {
                const portfolio = aPortFolioForTesting()
                    .withAsset("Lottery Prediction,2024/4/15,50")
                    .onDate('2024-01-01')
                    .build();

                portfolio.computePortfolioValue();

                expect(portfolio.messages[0]).toEqual("55")
            });

            it("handles Lottery when it has less than 11 days margin", () => {
                const portfolio = aPortFolioForTesting()
                    .withAsset("Lottery Prediction,2024/4/15,50")
                    .onDate('2024-04-04')
                    .build();

                portfolio.computePortfolioValue();

                expect(portfolio.messages[0]).toEqual("75");
            });

            it("handles Lottery when it has less than 6 days margin", () => {
                const portfolio = aPortFolioForTesting()
                    .withAsset("Lottery Prediction,2024/4/15,50")
                    .onDate('2024-04-09')
                    .build();

                portfolio.computePortfolioValue();

                expect(portfolio.messages[0]).toEqual("175");
            });

            it.each([[799, "804"], [800, "800"]])('Lottery with value %p', (value, expected) => {
                const portfolio = aPortFolioForTesting()
                    .withAsset(`Lottery Prediction,2024/4/15,${value}`)
                    .onDate('2024-04-09')
                    .build();

                portfolio.computePortfolioValue();

                expect(portfolio.messages[0]).toEqual(expected);
            });
        })

        it.each([[199, "189"], [200, "190"], [0, "0"]])('Another asset with value %p', (value, expected) => {
            const portfolio = aPortFolioForTesting()
                .withAsset(`Another asset,2024/4/15,${value}`)
                .onDate('2024-04-09')
                .build();

            portfolio.computePortfolioValue();

            expect(portfolio.messages[0]).toEqual(expected)
        });
    })

    it('throws an error when we do not have assets', () => {
        const portfolio = aPortFolioForTesting()
            .withAsset("")
            .onDate('2025-01-01')
            .build();

        expect(() => portfolio.computePortfolioValue()).toThrowError();
    });

    it('throws an error when insert a invalid date', () => {
        const portfolio = aPortFolioForTesting()
            .withAsset("Another asset,2024/15,0")
            .onDate('2025-01-01')
            .build();

        expect(() => portfolio.computePortfolioValue()).toThrowError();
    });
});

class TestingPortfolio extends Portfolio {
    messages: string[] = [];
    private readonly date: Date;
    private readonly assetLines: string[];

    public constructor(assetLines: string[], date: Date) {
        super("");
        this.date = date;
        this.assetLines = assetLines;
    }

    protected getNow() {
        return this.date;
    }

    protected displayMessage(message: string) {
        this.messages.push(message);
    }

    protected getAssetLines(): string[] {
        return this.assetLines;
    }
}

function aPortFolioForTesting(): TestingPortFolioBuilder {
    return new TestingPortFolioBuilder();
}

class TestingPortFolioBuilder {
    private readonly lines: string[];
    private now: Date;

    constructor() {
        this.lines = [];
        this.now = new Date();
    }

    public withAsset(line: string): TestingPortFolioBuilder {
        this.lines.push(line);
        return this;
    };

    public onDate(dateInString: string): TestingPortFolioBuilder {
        this.now = new Date(dateInString);
        return this;
    };

    public build(): TestingPortfolio {
        return new TestingPortfolio(this.lines, this.now)
    }

}