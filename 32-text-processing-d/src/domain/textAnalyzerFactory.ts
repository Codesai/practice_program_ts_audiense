import {Options} from "./options";
import {Reporter} from "./reporter";
import {TextAnalyzer} from "./textAnalyzer";
import {WordsExtraction} from "./wordsExtraction";
import {ExclusionListWordsExtraction} from "./wordsExtractions/exclusionListWordsExtraction";
import {AllWordsExtraction} from "./wordsExtractions/allWordsExtraction";
import {ByFrequencyWordRanker} from "./wordRankers/byFrequencyWordRanker";
import {MinFrequencyWordRanker} from "./wordRankers/minFrequencyWordRanker";
import {TopNWordRanker} from "./wordRankers/topNWordRanker";
import {WordRanker} from "./wordRanker";
import {CaseSensitiveKeyGenerator} from "./wordRankers/keyGenerators/caseSensitiveKeyGenerator";
import {CaseInSensitiveKeyGenerator} from "./wordRankers/keyGenerators/caseInSensitiveKeyGenerator";
import {KeyGenerator} from "./wordRankers/keyGenerator";

export class TextAnalyzerFactory {
    static createTextAnalyzer(options: Options, reporter: Reporter): TextAnalyzer {
        return new TextAnalyzer(
            reporter,
            this.createWordsExtraction(options),
            this.createFrequencyWordRanker(options)
        );
    }

    private static createFrequencyWordRanker(options: Options): WordRanker {
        let wordRanker: WordRanker = new ByFrequencyWordRanker(createKeyGenerator(options));
        if (options.minFreq) {
            wordRanker = new MinFrequencyWordRanker(options.minFreq, wordRanker);
        }
        if (options.max) {
            wordRanker = new TopNWordRanker(options.max, wordRanker);
        }
        return wordRanker;

        function createKeyGenerator(options: Options): KeyGenerator {
            return !options.noCase ? new CaseSensitiveKeyGenerator() : new CaseInSensitiveKeyGenerator();
        }
    }

    private static createWordsExtraction(options: Options): WordsExtraction {
        let wordsExtraction: WordsExtraction = new AllWordsExtraction();
        if (options.noShow) {
            wordsExtraction = new ExclusionListWordsExtraction(options.noShow, wordsExtraction);
        }
        return wordsExtraction;
    }
}
