import {Display} from "../../domain/display";
import {AnalysisResult} from "../../domain/analysisResult";
import {Reporter} from "../../domain/reporter";
import {RankedWord} from "../../domain/rankedWord";

export class TextBasedReporter implements Reporter {
    private readonly display: Display;

    constructor(display: Display) {
        this.display = display;
    }

    report(analysis: AnalysisResult): void {
        this.display.showText(this.composeReportFor(analysis));
    }

    private composeReportFor(analysis: AnalysisResult): string {
        if (analysis.countedWords === 0) {
            return this.footer(analysis.countedWords);
        }

        return this.header(analysis.rankedWords.length) +
            this.listRankedWords(analysis.rankedWords) +
            this.footer(analysis.countedWords);
    }

    private header(rankedWordsCount: number): string {
        const subjectVerbAgreementForBe = this.subjectVerbAgreementForBe(rankedWordsCount);
        const rankedWordsLength = `${rankedWordsCount}`;
        const wordGrammaticalNumber = `${this.wordGrammaticalNumber(rankedWordsCount)}`;
        return `${subjectVerbAgreementForBe} the top ${rankedWordsLength} most used ${wordGrammaticalNumber}:\n`;
    }

    private footer(countedWords: number): string {
        return `The text contains ${countedWords} ${this.wordGrammaticalNumber(countedWords)}.\n`;
    }

    private wordGrammaticalNumber(countedWords: number): string {
        return countedWords === 1 ? 'word' : 'words';
    }

    private subjectVerbAgreementForBe(countedWords: number): string {
        return countedWords === 1 ? 'This is' : 'These are';
    }

    private listRankedWords(rankedWords: Array<RankedWord>): string {
        return rankedWords.reduce(
            (acc: { result: ""; index: 0 }, word: RankedWord): { result: string; index: number } => {
                acc.result += `${acc.index + 1} ${word.word} (${word.frequency})\n`;
                return {index: acc.index + 1, result: acc.result}
            }, {index: 0, result: ""}).result;
    }
}