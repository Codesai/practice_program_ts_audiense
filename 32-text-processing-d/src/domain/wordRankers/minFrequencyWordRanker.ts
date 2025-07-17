import {WordRanker} from "../wordRanker";
import {RankedWord} from "../rankedWord";

export class MinFrequencyWordRanker implements WordRanker {
    private readonly minFreq: number;
    private readonly wordRanker: WordRanker;

    constructor(minFreq: number, wordRanker: WordRanker) {
        this.minFreq = minFreq;
        this.wordRanker = wordRanker;
    }

    rank(wordsToRank: string[]): RankedWord[] {
        return this.wordRanker.rank(wordsToRank)
            .filter(rankedWord => rankedWord.frequency >= this.minFreq);
    }
}
