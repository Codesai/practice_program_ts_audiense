import {InputParser, UnknownOptionError} from "../../src/cliApp/inputParser";
import {Options} from "../../src/domain/options";

// Most tests were generated interacting with openai-GPT-4o

describe("parseInput", () => {
    describe("valid inputs", () => {
        it("should parse input with noshow option", () => {
            const input = "lalalala kokokoko --noshow=[pepe]";
            const expectedOutput = {
                text: "lalalala kokokoko",
                options: {noShow: ["pepe"]},
            };
            expect(parseInput(input)).toEqual(expectedOutput);
        });

        it("should parse input with minfreq option", () => {
            const input = "ñaklak kpetuko --minfreq=5";
            const expectedOutput = {
                text: "ñaklak kpetuko",
                options: {minFreq: 5},
            };
            expect(parseInput(input)).toEqual(expectedOutput);
        });

        it("should parse input with max option", () => {
            const input = "ñaklak kpetuko --max=8";
            const expectedOutput = {
                text: "ñaklak kpetuko",
                options: {max: 8},
            };
            expect(parseInput(input)).toEqual(expectedOutput);
        });

        it("should parse input without options", () => {
            const input = "kljbdgnñlrbnñrewñblnñlaewb gdewabgwhbr4ewh";
            const expectedOutput = {
                text: "kljbdgnñlrbnñrewñblnñlaewb gdewabgwhbr4ewh",
                options: {},
            };
            expect(parseInput(input)).toEqual(expectedOutput);
        });

        it("should parse input with empty array for noshow", () => {
            const input = "lalalala kokokoko --noshow=[] --minfreq=42";
            const expectedOutput = {
                text: "lalalala kokokoko",
                options: {noShow: [], minFreq: 42},
            };
            expect(parseInput(input)).toEqual(expectedOutput);
        });

        it("should parse input without options removing -- (case 15)", () => {
            const input = "lalalala kokokoko --";
            const expectedOutput = {
                text: "lalalala kokokoko",
                options: {},
            };
            expect(parseInput(input)).toEqual(expectedOutput);
        });

        it.each([
            ["--nocase=true", {noCase: true}],
            ["--nocase=false", {noCase: false}],
        ])("should parse input with nocase option (%s => %s)", (optionsInput: string, options: Options) => {
            const input = `pepe Pepe ${optionsInput}`;
            const expectedOutput = {
                text: "pepe Pepe",
                options: options,
            };
            let actual = parseInput(input);
            expect(actual).toEqual(expectedOutput);
        });
    });

    describe("invalid inputs", () => {
        it("should throw an error for missing value in noshow option", () => {
            const input = "lalalala kokokoko --noshow= --minfreq=3 ";

            expect(() => parseInput(input)).toThrow(
                'Invalid or missing argument in option: "--noshow="'
            );
        });

        it("should throw an error for missing value in noshow option with no '='", () => {
            const input = "ñaklak kpetuko --minfreq=5 --noshow ";

            expect(() => parseInput(input)).toThrow(
                'Invalid or missing argument in option: "--noshow"'
            );
        });

        it("should throw an error for missing value in minfreq option", () => {
            const input = "lalalala lalalala --minfreq= ";

            expect(() => parseInput(input)).toThrow(
                'Invalid or missing argument in option: "--minfreq="'
            );
        });

        it("should throw an error for missing '=' in minfreq option", () => {
            const input = "koko kpetuko --minfreq";

            expect(() => parseInput(input)).toThrow(
                'Invalid or missing argument in option: "--minfreq"'
            );
        });

        it("should tell the wrong option text for an unknown option", () => {
            const input = "lalalala kokokoko --title='Hello'";
            expect(() => parseInput(input)).toThrow('Unknown option: "title"');
        });

        it("should throw an UnknownOptionError for unknown options", () => {
            const input = "lalalala kokokoko --title='Hello'";
            expect(() => parseInput(input)).toThrow(UnknownOptionError);
        });
    });

    function parseInput(input: string) {
        return new InputParser().parseInput(input);
    }
});