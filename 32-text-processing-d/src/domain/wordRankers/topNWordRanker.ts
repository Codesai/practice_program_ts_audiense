import {WordRanker} from "../wordRanker";
import {RankedWord} from "../rankedWord";

export class TopNWordRanker implements WordRanker {
    private readonly top: number;
    private readonly wordRanker: WordRanker;

    constructor(top: number, wordRanker: WordRanker) {
        this.wordRanker = wordRanker;
        this.top = top;
    }

    rank(wordsToRank: string[]): RankedWord[] {
        return this.wordRanker.rank(wordsToRank).slice(0, this.top);
    }
}
