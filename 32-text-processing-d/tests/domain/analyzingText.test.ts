import {TextAnalyzer} from "../../src/domain/textAnalyzer";
import {Reporter} from "../../src/domain/reporter";
import {AnalysisResult} from "../../src/domain/analysisResult";
import {RankedWord} from "../../src/domain/rankedWord";
import {rankedWord, rankedWords} from "../helpers/builders";
import {AllWordsExtraction} from "../../src/domain/wordsExtractions/allWordsExtraction";
import {ByFrequencyWordRanker} from "../../src/domain/wordRankers/byFrequencyWordRanker";
import {CaseSensitiveKeyGenerator} from "../../src/domain/wordRankers/keyGenerators/caseSensitiveKeyGenerator";

describe('analysing text', () => {
    let reporter: jest.Mocked<Reporter>;
    let analyzer: TextAnalyzer;

    beforeEach(() => {
        reporter = {report: jest.fn()};
        analyzer = new TextAnalyzer(reporter, new AllWordsExtraction(), new ByFrequencyWordRanker(new CaseSensitiveKeyGenerator()));
    });

    it.each([
        ["", 0],
        ["text", 1],
        ['-_*(!@#$%^&*()_-={}[]:\"<>,.?/~`', 0],
        ["text longer", 2],
        ["text      longer", 2],
        ["text text longer", 3],
    ])('counting words of "%s"', (text: string, countedWords: number) => {
        analyzer.analyze(text);

        expect(actualAnalysisResult().countedWords).toBe(countedWords);
    });

    it.each([
        ["", []],
        ['-_*(!@#$%^&*()_-={}[]:\"<>,.?/~`', []],
        ["text", rankedWords(rankedWord("text").withFrequency(1))],
        ["text ranking text ranking", rankedWords(rankedWord("text").withFrequency(2), rankedWord("ranking").withFrequency(2))],
        ["text ranking text ranking ranking", rankedWords(rankedWord("ranking").withFrequency(3), rankedWord("text").withFrequency(2))],
    ])('ranking words by frequency "%s"', (text: string, rankedWords: RankedWord[]) => {
        analyzer.analyze(text);

        expect(actualAnalysisResult().rankedWords).toEqual(rankedWords);
    });

    function actualAnalysisResult(): AnalysisResult {
        const [[analysisResult]] = reporter.report.mock.calls;
        return analysisResult;
    }
});
