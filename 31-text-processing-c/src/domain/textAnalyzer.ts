import {AnalysisResult} from "./analysisResult";
import {Reporter} from "./reporter";
import {RankedWord} from "./rankedWord";
import {WordsExtraction} from "./wordsExtraction";
import {AllWordsExtraction} from "./wordsExtractions/allWordsExtraction";

export class TextAnalyzer {
    private readonly reporter: Reporter;
    private readonly analysis: Analysis;

    constructor(textBasedReporter: Reporter, wordsExtraction: WordsExtraction) {
        this.reporter = textBasedReporter;
        this.analysis = new Analysis(wordsExtraction);
    }

    analyze(text: string): void {
        const analysisResult = this.analysis.runOn(text);
        this.reporter.report(analysisResult);
    }
}

class Analysis {
    private readonly wordsToRankExtraction: WordsExtraction;
    private readonly textWordsExtraction: WordsExtraction;

    constructor(wordsToRankExtraction: WordsExtraction) {
        this.wordsToRankExtraction = wordsToRankExtraction;
        this.textWordsExtraction = new AllWordsExtraction();
    }

    runOn(text: string): AnalysisResult {
        return new AnalysisResult(this.rankWordsIn(text), this.countWordsIn(text));
    }

    private countWordsIn(text: string) {
        return this.textWordsExtraction.extractFrom(text).length;
    }

    private rankWordsIn(text: string): RankedWord[] {
        const wordsToRank = this.wordsToRankExtraction.extractFrom(text);
        const wordFrequencies = this.generateWordFrequencyMap(wordsToRank);
        const rankedWords = this.rankWordFrom(wordFrequencies);
        this.sortByFrequency(rankedWords);
        return rankedWords;
    }

    private sortByFrequency(rankedWords: RankedWord[]): void {
        rankedWords.sort((a, b) => b.frequency - a.frequency);
    }

    private rankWordFrom(wordFrequencyMap: Map<string, number>): RankedWord[] {
        return Array.from(wordFrequencyMap.entries()).map(
            ([word, frequency]) => new RankedWord(word, frequency)
        );
    }

    private generateWordFrequencyMap(wordsToRank: string[]): Map<string, number> {
        return wordsToRank.reduce(
            (acc: Map<string, number>, word: string) => {
                acc.set(word, (acc.get(word) ?? 0) + 1);
                return acc;
            },
            new Map<string, number>()
        );
    }
}