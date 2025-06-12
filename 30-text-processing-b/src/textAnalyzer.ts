import {Analysis} from "./analysis";
import {Reporter} from "./reporter";
import {RankedWord} from "./rankedWord";

export class TextAnalyzer {
    private readonly reporter: Reporter;

    constructor(textBasedReporter: Reporter) {
        this.reporter = textBasedReporter;
    }

    analyze(text: string): void {
        const analysis = this.runAnalysis(text);
        this.reporter.report(analysis);
    }

    private runAnalysis(text: string): Analysis {
        const words = this.extractWords(text);
        const rankedWords = this.rank(words);
        return new Analysis(rankedWords, words.length);
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

    private extractWords(text: string): string[] {
        return text.replace(/[^0-9a-z\s]+/gi, '').split(" ").filter(s => s != '');
    }
}