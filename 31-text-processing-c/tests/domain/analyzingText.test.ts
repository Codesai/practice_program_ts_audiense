import {TextAnalyzer} from "../../src/domain/textAnalyzer";
import {Reporter} from "../../src/domain/reporter";
import {AnalysisResult} from "../../src/domain/analysisResult";
import {RankedWord} from "../../src/domain/rankedWord";
import {rankedWord} from "../helpers/builders";
import {AllWordsExtraction} from "../../src/domain/wordsExtractions/allWordsExtraction";

describe('analysing text', () => {
    let reporter: jest.Mocked<Reporter>;
    let analyzer: TextAnalyzer;

    beforeEach(
        () => {
            reporter = {report: jest.fn()};
            analyzer = new TextAnalyzer(reporter, new AllWordsExtraction());
        }
    );

    it.each([
        ["", 0],
        ["text", 1],
        ['-_*(!@#$%^&*()_-={}[]:\"<>,.?/~`', 0],
        ["text longer", 2],
        ["text      longer", 2],
        ["text text longer", 3],
    ])('counting words of "%s"', (text: string, countedWords: number) => {
        analyzer.analyze(text);

        expect(actualAnalysis().countedWords).toBe(countedWords);
    });

    it.each([
        ["", []],
        ['-_*(!@#$%^&*()_-={}[]:\"<>,.?/~`', []],
        ["text", [rankedWord("text").withFrequency(1).build()]],
        ["text ranking text ranking", [rankedWord("text").withFrequency(2).build(), rankedWord("ranking").withFrequency(2)]],
        ["text ranking text ranking ranking", [rankedWord("ranking").withFrequency(3), rankedWord("text").withFrequency(2)]],
    ])('ranking words by frequency "%s"', (text: string, rankedWords: RankedWord[]) => {
        analyzer.analyze(text);

        expect(actualAnalysis().rankedWords).toEqual(rankedWords);
    });

    function actualAnalysis(): AnalysisResult {
        const [[analysis]] = reporter.report.mock.calls;
        return analysis;
    }
});