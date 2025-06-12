import {Display} from "../../../src/domain/display";
import {TextAnalyzerConsoleApp} from "../../../src/infrastructure/cliApp/textAnalyzerConsoleApp";

describe('Text Analyzer App', () => {
    let display: jest.Mocked<Display>;
    let analyzerApp: TextAnalyzerConsoleApp;

    beforeEach(() => {
        display = {showText: jest.fn()};
        analyzerApp = new TextAnalyzerConsoleApp(display);
    });

    it('reporting 0 words', () => {
        analyzerApp.analyze("");

        expect(display.showText).toHaveBeenCalledWith("The text contains 0 words.\n");
    });

    it('reporting several words', () => {
        analyzerApp.analyze("koko word koko");

        expect(display.showText).toHaveBeenCalledWith(
            "These are the top 2 most used words:\n" +
            `1 koko (2)\n` +
            `2 word (1)\n` +
            "The text contains 3 words.\n"
        );
    });

    it('reporting excluding some words', () => {
        analyzerApp.analyze("koko word koko --noshow=[koko]");

        expect(display.showText).toHaveBeenCalledWith(
            "This is the top 1 most used word:\n" +
            `1 word (1)\n` +
            "The text contains 3 words.\n"
        );
    });
});