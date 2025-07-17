import {AnalysisResult} from "./analysisResult";
import {Reporter} from "./reporter";
import {RankedWord} from "./rankedWord";
import {WordsExtraction} from "./wordsExtraction";
import {AllWordsExtraction} from "./wordsExtractions/allWordsExtraction";
import {WordRanker} from "./wordRanker";

export class TextAnalyzer {
    private readonly reporter: Reporter;
    private readonly wordsToRankExtraction: WordsExtraction;
    private readonly textWordsExtraction: WordsExtraction;
    private readonly wordRanker: WordRanker;

    constructor(textBasedReporter: Reporter, wordsToRankExtraction: WordsExtraction, wordRanker: WordRanker) {
        this.reporter = textBasedReporter;
        this.wordsToRankExtraction = wordsToRankExtraction;
        this.textWordsExtraction = new AllWordsExtraction();
        this.wordRanker = wordRanker;
    }

    analyze(text: string): void {
        const analysisResult = this.runOn(text);
        this.reporter.report(analysisResult);
    }

    runOn(text: string): AnalysisResult {
        return new AnalysisResult(this.rankWordsIn(text), this.countWordsIn(text));
    }

    private countWordsIn(text: string): number {
        return this.textWordsExtraction.extractFrom(text).length;
    }

    private rankWordsIn(text: string): RankedWord[] {
        const wordsToRank = this.wordsToRankExtraction.extractFrom(text);
        return this.wordRanker.rank(wordsToRank);
    }
}
