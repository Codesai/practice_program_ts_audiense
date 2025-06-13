import {AllWordsExtraction} from "../../../src/domain/wordsExtractions/allWordsExtraction";
import {ExclusionListWordsExtraction} from "../../../src/domain/wordsExtractions/exclusionListWordsExtraction";
import {WordsExtraction} from "../../../src/domain/wordsExtraction";

describe('extracting words not in exclusion list', () => {

    it('when exclusion list is empty, all words are included', () => {
        const wordsExtraction = createWordsExtraction();

        const words = wordsExtraction.extractFrom("text");

        expect(words).toEqual(["text"]);
    });

    it('when exclusion list is not empty, excluded words are not included', () => {
        const wordsExtraction = new ExclusionListWordsExtraction(["text"], new AllWordsExtraction());

        const words = wordsExtraction.extractFrom("text will not be extracted");

        expect(words).toEqual(["will", "not", "be", "extracted"]);
    });

    function createWordsExtraction(): WordsExtraction {
        return new ExclusionListWordsExtraction([], new AllWordsExtraction());
    }
});