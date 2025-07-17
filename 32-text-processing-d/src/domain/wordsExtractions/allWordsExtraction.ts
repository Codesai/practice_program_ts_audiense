import {WordsExtraction} from "../wordsExtraction";

export class AllWordsExtraction implements WordsExtraction {
    extractFrom(text: string): string[] {
        return text.replace(/[^0-9a-z\s]+/gi, '').split(" ").filter(s => s != '');
    }
}