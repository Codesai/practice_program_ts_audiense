import {RankedWord} from "../rankedWord";
import {WordRanker} from "../wordRanker";
import {KeyGenerator} from "./keyGenerator";

export class ByFrequencyWordRanker implements WordRanker {
    private readonly keyGenerator: KeyGenerator;

    constructor(keyGenerator: KeyGenerator) {
        this.keyGenerator = keyGenerator;
    }

    rank(wordsToRank: string[]): RankedWord[] {
        const wordFrequencies = this.generateWordFrequencyMap(wordsToRank);
        const rankedWords = this.rankWordFrom(wordFrequencies);
        this.sortByFrequency(rankedWords);
        return rankedWords;
    }

    private sortByFrequency(rankedWords: RankedWord[]): void {
        rankedWords.sort((a, b) => b.frequency - a.frequency);
    }

    private rankWordFrom(wordFrequencyMap: Map<string, number>): RankedWord[] {
        return Array.from(wordFrequencyMap.entries()).map(
            ([word, frequency]) => new RankedWord(word, frequency)
        );
    }

    private generateWordFrequencyMap(wordsToRank: string[]): Map<string, number> {
        return wordsToRank.reduce(
            (acc: Map<string, number>, word: string) => {
                let key = this.keyGenerator.getKeyFrom(word);
                acc.set(key, (acc.get(key) ?? 0) + 1);
                return acc;
            },
            new Map<string, number>()
        );
    }
}
