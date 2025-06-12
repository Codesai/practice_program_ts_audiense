import {RankedWord} from "../../src/domain/rankedWord";
import {Analysis} from "../../src/domain/analysis";

export function anAnalysis(): AnalysisBuilder {
    return new AnalysisBuilder([], 0);
}

export function rankedWord(text: string = ""): RankedWordBuilder {
    return new RankedWordBuilder(text, 0);
}

class AnalysisBuilder {
    private countedWords: number;
    private readonly rankedWords: Array<RankedWord>;

    public constructor(rankedWords: Array<RankedWord>, countedWords: number) {
        this.rankedWords = rankedWords;
        this.countedWords = countedWords;
    }

    public ofTextWithLength(countedWords: number): AnalysisBuilder {
        this.countedWords = countedWords;
        return this;
    }

    public add(aRankedWordBuilder: RankedWordBuilder): AnalysisBuilder {
        this.rankedWords.push(aRankedWordBuilder.build());
        return this;
    }

    public build(): Analysis {
        return new Analysis(this.rankedWords, this.countedWords);
    }
}

class RankedWordBuilder {
    private readonly word: string = "";
    private frequency: number = 0;

    public constructor(word: string, frequency: number) {
        this.word = word;
        this.frequency = frequency;
    }

    public withFrequency(frequency: number): RankedWordBuilder {
        this.frequency = frequency;
        return this;
    }

    public build(): RankedWord {
        return new RankedWord(this.word, this.frequency);
    }
}