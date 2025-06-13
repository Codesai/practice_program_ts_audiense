import {Reporter} from "../domain/reporter";
import {InputParser} from "./inputParser";
import {TextAnalyzerFactory} from "../domain/textAnalyzerFactory";
import {Display} from "./display";
import {TextBasedReporter} from "./textBasedReporter";

export class TextAnalyzerConsoleApp {
    private readonly reporter: Reporter;
    private inputParser: InputParser;

    constructor(display: jest.Mocked<Display>) {
        this.reporter = new TextBasedReporter(display);
        this.inputParser = new InputParser();
    }

    analyze(input: string): void {
        const {text, options} = this.inputParser.parseInput(input);
        const analyzer = TextAnalyzerFactory.createTextAnalyzer(options, this.reporter);
        analyzer.analyze(text);
    }
}

