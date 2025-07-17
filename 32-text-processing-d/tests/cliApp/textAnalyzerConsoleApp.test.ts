import {Display} from "../../src/cliApp/display";
import {TextAnalyzerConsoleApp} from "../../src/cliApp/textAnalyzerConsoleApp";

describe('Text Analyzer Console App', () => {
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

    it('reporting min frequency words', () => {
        analyzerApp.analyze("koko word koko --minfreq=2");

        expect(display.showText).toHaveBeenCalledWith(
            "This is the top 1 most used word:\n" +
            `1 koko (2)\n` +
            "The text contains 3 words.\n"
        );
    });

    it('reporting top N words', () => {
        analyzerApp.analyze("koko word koko --max=1");

        expect(display.showText).toHaveBeenCalledWith(
            "This is the top 1 most used word:\n" +
            `1 koko (2)\n` +
            "The text contains 3 words.\n"
        );
    });

    it('reporting top N words that follow the given frequency', () => {
        analyzerApp.analyze("koko word koko koko hello word --minfreq=2 --max=1");

        expect(display.showText).toHaveBeenCalledWith(
            "This is the top 1 most used word:\n" +
            `1 koko (3)\n` +
            "The text contains 6 words.\n"
        );
    });

    it('reporting several words with case insensitive option', () => {
        analyzerApp.analyze("koko word Koko worD --nocase=true");

        expect(display.showText).toHaveBeenCalledWith(
            "These are the top 2 most used words:\n" +
            `1 koko (2)\n` +
            `2 word (2)\n` +
            "The text contains 4 words.\n"
        );
    });
});
