import {Analysis} from "./analysis";
import {Reporter} from "./reporter";
import {RankedWord} from "./rankedWord";
import {WordsExtraction} from "./wordsExtraction";
import {AllWordsExtraction} from "./wordsExtractions/allWordsExtraction";

export class TextAnalyzer {
    private readonly reporter: Reporter;
    private readonly wordsToRankExtraction: WordsExtraction;
    private readonly textWordsExtraction: WordsExtraction;

    constructor(textBasedReporter: Reporter, wordsExtraction: WordsExtraction) {
        this.reporter = textBasedReporter;
        this.wordsToRankExtraction = wordsExtraction;
        this.textWordsExtraction = new AllWordsExtraction();
    }

    analyze(text: string): void {
        const analysis = this.runAnalysis(text);
        this.reporter.report(analysis);
    }

    private runAnalysis(text: string): Analysis {
        const words = this.wordsToRankExtraction.extractFrom(text);
        const rankedWords = this.rank(words);
        return new Analysis(rankedWords, this.textWordsExtraction.extractFrom(text).length);
    }

    private rank(words: string[]): RankedWord[] {
        const wordFrequencyMap = words.reduce(
            (acc: Map<string, number>, word: string) => {
                acc.set(word, (acc.get(word) ?? 0) + 1);
                return acc;
            }, new Map<string, number>());
        const rankedWords = Array.from(wordFrequencyMap.entries()).map(
            ([word, frequency]) => new RankedWord(word, frequency)
        );
        rankedWords.sort((a, b) => b.frequency - a.frequency);
        return rankedWords;
    }
}