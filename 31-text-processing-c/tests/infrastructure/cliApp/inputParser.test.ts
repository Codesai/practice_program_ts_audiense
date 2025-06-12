import {InputParser, UnknownOptionError} from "../../../src/infrastructure/cliApp/inputParser";

// Generated interacting with openai-gpt-4o

describe("parseInput", () => {

    it("should parse input with noshow and minfreq options (case 1)", () => {
        const input = "lalalala kokokoko --noshow=[pepe] --minfreq=3 ";
        const expectedOutput = {
            text: "lalalala kokokoko ",
            options: {noShow: ["pepe"], minFreq: 3},
        };
        expect(parseInput(input)).toEqual(expectedOutput);
    });

    it("should parse input with noshow and minfreq options with alternate values (case 2)", () => {
        const input = "ñaklak kpetuko --minfreq=5 --noshow=[moño] ";
        const expectedOutput = {
            text: "ñaklak kpetuko ",
            options: {noShow: ["moño"], minFreq: 5},
        };
        expect(parseInput(input)).toEqual(expectedOutput);
    });

    it("should parse input with noshow and max options (case 3)", () => {
        const input = "ñaklak kpetuko --max=2 --noshow=[moño] ";
        const expectedOutput = {
            text: "ñaklak kpetuko ",
            options: {noShow: ["moño"], max: 2},
        };
        expect(parseInput(input)).toEqual(expectedOutput);
    });

    it("should parse input with max and nowordsinfile options (case 4)", () => {
        const input = "ñaklak kpetuko --max=8      --nowordsinfile=\\src\\file.txt ";
        const expectedOutput = {
            text: "ñaklak kpetuko ",
            options: {noWordsInFile: "\\src\\file.txt", max: 8},
        };
        expect(parseInput(input)).toEqual(expectedOutput);
    });

    it("should parse input without options (case 5)", () => {
        const input = "kljbdgnñlrbnñrewñblnñlaewb gdewabgwhbr4ewh";
        const expectedOutput = {
            text: "kljbdgnñlrbnñrewñblnñlaewb gdewabgwhbr4ewh",
            options: {},
        };
        expect(parseInput(input)).toEqual(expectedOutput);
    });

    it("should throw an error for missing value in noshow option (invalid case 1)", () => {
        const input = "lalalala kokokoko --noshow= --minfreq=3 ";
        // Updated expected error message to include the invalid argument
        expect(() => parseInput(input)).toThrow(
            'Invalid or missing argument in option: "--noshow="'
        );
    });

    it("should throw an error for missing value in noshow option with no '=' (invalid case 2)", () => {
        const input = "ñaklak kpetuko --minfreq=5 --noshow ";
        // Updated expected error message to include the invalid argument
        expect(() => parseInput(input)).toThrow(
            'Invalid or missing argument in option: "--noshow"'
        );
    });

    it("should throw an error for missing value in minfreq option (invalid case 3)", () => {
        const input = "lalalala lalalala --minfreq= ";
        // Updated expected error message to include the invalid argument
        expect(() => parseInput(input)).toThrow(
            'Invalid or missing argument in option: "--minfreq="'
        );
    });

    it("should throw an error for missing '=' in minfreq option (invalid case 4)", () => {
        const input = "koko kpetuko --minfreq";
        // Updated expected error message to include the invalid argument
        expect(() => parseInput(input)).toThrow(
            'Invalid or missing argument in option: "--minfreq"'
        );
    });

    it("should tell the unknown option", () => {
        const input = "lalalala kokokoko --title='Hello'";
        expect(() => parseInput(input)).toThrow('Unknown option: "title"');
    });

    it("should throw an error for unknown options", () => {
        const input = "lalalala kokokoko --title='Hello'";
        expect(() => parseInput(input)).toThrow(UnknownOptionError);
    });

    it("should parse input with empty array for noshow (case 6)", () => {
        const input = "lalalala kokokoko --noshow=[] --minfreq=42";
        const expectedOutput = {
            text: "lalalala kokokoko ",
            options: {noShow: [], minFreq: 42},
        };
        expect(parseInput(input)).toEqual(expectedOutput);
    });

    it("should parse input without options removing -- (case 15)", () => {
        const input = "lalalala kokokoko --";
        const expectedOutput = {
            text: "lalalala kokokoko ",
            options: {},
        };
        expect(parseInput(input)).toEqual(expectedOutput);
    });

    function parseInput(input: string) {
        return new InputParser().parseInput(input);
    }
});
