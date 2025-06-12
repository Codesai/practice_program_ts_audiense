import {TextAnalyzer} from "../src/textAnalyzer";
import {TextBasedReporter} from "../src/textBasedReporter";
import {Display} from "../src/display";

describe('Text Analyzer', () => {
    let display: jest.Mocked<Display>;

    it('reporting 0 words', () => {
        display = {showText: jest.fn()};
        const analyzer = new TextAnalyzer(new TextBasedReporter(display));

        analyzer.analyze("");

        expect(display.showText).toHaveBeenCalledWith("The text contains 0 words.\n");
    });

    it('reporting several words', () => {
        display = {showText: jest.fn()};
        const analyzer = new TextAnalyzer(new TextBasedReporter(display));

        analyzer.analyze("koko word koko");

        expect(display.showText).toHaveBeenCalledWith(
            "These are the top 2 most used words:\n" +
            `1 koko (2)\n` +
            `2 word (1)\n` +
            "The text contains 3 words.\n"
        );
    });
});