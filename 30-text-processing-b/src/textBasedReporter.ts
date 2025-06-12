import {Display} from "./display";
import {Analysis} from "./analysis";
import {Reporter} from "./reporter";
import {RankedWord} from "./rankedWord";

export class TextBasedReporter implements Reporter {
    private readonly display: Display;

    constructor(display: Display) {
        this.display = display;
    }

    report(analysis: Analysis): void {
        this.display.showText(this.composeReportFor(analysis));
    }

    private composeReportFor(analysis: Analysis): string {
        if (analysis.countedWords === 0) {
            return this.footer(analysis.countedWords);
        }

        return this.header(analysis) +
            this.listRankedWords(analysis.rankedWords) +
            this.footer(analysis.countedWords);
    }

    private header(analysis: Analysis): string {
        const subjectVerbAgreementForBe = this.subjectVerbAgreementForBe(analysis.countedWords);
        const rankedWordsLength = `${analysis.rankedWords.length}`;
        const wordGrammaticalNumber = `${this.wordGrammaticalNumber(analysis.countedWords)}`;
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