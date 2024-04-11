import {TestingPortfolio} from "./TestingPortfolio";
import {AssetsFileLineBuilder} from "./AssetsFileLineBuilder";

export function aPortFolio(): TestingPortFolioBuilder {
    return new TestingPortFolioBuilder();
}

export function anEmptyPortFolio(): TestingPortFolioBuilder {
    return TestingPortFolioBuilder.empty();
}

class TestingPortFolioBuilder {
    private lines: string[];
    private now: Date;

    constructor() {
        this.lines = [];
        this.now = new Date();
    }

    public with(lineBuilder: AssetsFileLineBuilder): TestingPortFolioBuilder {
        this.lines.push(lineBuilder.build());
        return this;
    };

    public onDate(dateInString: string): TestingPortFolioBuilder {
        const [year, month, day] = dateInString.split("/");
        if ([year, month, day].some((value) => value === undefined)) {
            throw new Error("wrong date");
        }
        this.now = new Date(
            Date.UTC(
                Number.parseInt(year),
                Number.parseInt(month) - 1,
                Number.parseInt(day),
                0, 0, 0,
                0));
        return this;
    };

    public build(): TestingPortfolio {
        return new TestingPortfolio(this.lines, this.now)
    }

    public static empty(): TestingPortFolioBuilder {
        const builder = aPortFolio();
        builder.lines = [""];
        return builder;
    }
}