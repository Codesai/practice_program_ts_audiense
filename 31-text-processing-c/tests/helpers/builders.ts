import {RankedWord} from "../../src/domain/rankedWord";
import {AnalysisResult} from "../../src/domain/analysisResult";

export function anAnalysisResult(): AnalysisResultBuilder {
    return new AnalysisResultBuilder([], 0);
}

export function rankedWord(text: string = ""): RankedWordBuilder {
    return new RankedWordBuilder(text, 0);
}

export function rankedWords(...rankedWordBuilders: RankedWordBuilder[]): RankedWord[] {
    return rankedWordBuilders.map(builder => builder.build());
}

class AnalysisResultBuilder {
    private countedWords: number;
    private readonly rankedWords: Array<RankedWord>;

    public constructor(rankedWords: Array<RankedWord>, countedWords: number) {
        this.rankedWords = rankedWords;
        this.countedWords = countedWords;
    }

    public ofTextWithLength(countedWords: number): AnalysisResultBuilder {
        this.countedWords = countedWords;
        return this;
    }

    public add(aRankedWordBuilder: RankedWordBuilder): AnalysisResultBuilder {
        this.rankedWords.push(aRankedWordBuilder.build());
        return this;
    }

    public build(): AnalysisResult {
        return new AnalysisResult(this.rankedWords, this.countedWords);
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