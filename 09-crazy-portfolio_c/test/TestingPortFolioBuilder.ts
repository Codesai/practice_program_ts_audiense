import {TestingPortfolio} from "./TestingPortfolio";
import {AssetsFileLineBuilder} from "./AssetsFileLineBuilder";
import {createUTCDateFrom} from "./DateUtils";

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

    public onDate(dateAsString: string): TestingPortFolioBuilder {
        this.now = createUTCDateFrom(dateAsString);
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