import {WordsExtraction} from "../wordsExtraction";

export class ExclusionListWordsExtraction implements WordsExtraction {
    private readonly excludedWords: string[];
    private readonly wordsExtraction: WordsExtraction;

    constructor(excludedWords: string[], wordsExtraction: WordsExtraction) {
        this.excludedWords = excludedWords;
        this.wordsExtraction = wordsExtraction;
    }

    extractFrom(text: string): string[] {
        const words = this.wordsExtraction.extractFrom(text);
        return words.filter(word => !this.excludedWords.includes(word));
    }

}