import {RankedWord} from "../../../src/domain/rankedWord";
import {MinFrequencyWordRanker} from "../../../src/domain/wordRankers/minFrequencyWordRanker";
import {ByFrequencyWordRanker} from "../../../src/domain/wordRankers/byFrequencyWordRanker";
import {CaseSensitiveKeyGenerator} from "../../../src/domain/wordRankers/keyGenerators/caseSensitiveKeyGenerator";

describe('Min Frequency WordRanker', () => {
    it('Should return the list with the frequency of words greater than the given one', () => {
        const wordsToRank = ['hello', 'world', 'hello'];
        const minFreq = 2;
        const wordRanker = new MinFrequencyWordRanker(minFreq, new ByFrequencyWordRanker(new CaseSensitiveKeyGenerator()));

        const ranking = wordRanker.rank(wordsToRank);

        const expectedRank = [new RankedWord('hello', 2)]
        expect(ranking).toEqual(expectedRank);
    })
})
