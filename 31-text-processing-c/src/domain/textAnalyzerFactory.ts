import {Options} from "./options";
import {Reporter} from "./reporter";
import {TextAnalyzer} from "./textAnalyzer";
import {WordsExtraction} from "./wordsExtraction";
import {ExclusionListWordsExtraction} from "./wordsExtractions/exclusionListWordsExtraction";
import {AllWordsExtraction} from "./wordsExtractions/allWordsExtraction";

export class TextAnalyzerFactory {
    static createTextAnalyzer(options: Options, reporter: Reporter): TextAnalyzer {
        return new TextAnalyzer(
            reporter,
            this.createWordsExtraction(options)
        );
    }

    private static createWordsExtraction(options: Options): WordsExtraction {
        if (options.noShow) {
            return new ExclusionListWordsExtraction(options.noShow, new AllWordsExtraction());
        }
        return new AllWordsExtraction();
    }
}