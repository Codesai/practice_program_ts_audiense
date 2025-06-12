import {RankedWord} from "./rankedWord";

export class Analysis {
    readonly countedWords: number;
    readonly rankedWords: Array<RankedWord>;

    constructor(rankedWords: Array<RankedWord>, countedWords: number) {
        this.countedWords = countedWords;
        this.rankedWords = rankedWords;
    }
}