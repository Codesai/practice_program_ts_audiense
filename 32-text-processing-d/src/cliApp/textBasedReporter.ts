import {Display} from "./display";
import {AnalysisResult} from "../domain/analysisResult";
import {Reporter} from "../domain/reporter";
import {RankedWord} from "../domain/rankedWord";

export class TextBasedReporter implements Reporter {
    private readonly display: Display;

    constructor(display: Display) {
        this.display = display;
    }

    report(analysisResult: AnalysisResult): void {
        this.display.showText(this.composeReportFor(analysisResult));
    }

    private composeReportFor(analysisResult: AnalysisResult): string {
        if (analysisResult.countedWords === 0) {
            return this.footer(analysisResult.countedWords);
        }

        return this.header(analysisResult.rankedWords.length) +
            this.listRankedWords(analysisResult.rankedWords) +
            this.footer(analysisResult.countedWords);
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