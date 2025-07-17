import {RankedWord} from "../../../src/domain/rankedWord";
import {TopNWordRanker} from "../../../src/domain/wordRankers/topNWordRanker";
import {ByFrequencyWordRanker} from "../../../src/domain/wordRankers/byFrequencyWordRanker";
import {CaseSensitiveKeyGenerator} from "../../../src/domain/wordRankers/keyGenerators/caseSensitiveKeyGenerator";

describe("topNWordRanker", () => {
    it('Should return the list of top N words', () => {
        const wordsToRank = ['hello', 'hello', 'word']
        const max = 1;
        const wordRanker = new TopNWordRanker(max, new ByFrequencyWordRanker(new CaseSensitiveKeyGenerator()));

        const ranking = wordRanker.rank(wordsToRank);

        const expectedWords = [new RankedWord('hello', 2)];
        expect(ranking).toEqual(expectedWords)
    })
})
