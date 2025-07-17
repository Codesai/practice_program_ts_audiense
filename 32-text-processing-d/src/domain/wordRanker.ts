import {RankedWord} from "./rankedWord";

export interface WordRanker {
    rank(wordsToRank: string[]): RankedWord[];
}
