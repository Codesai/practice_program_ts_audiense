import {Options} from "../domain/options";
import {Input} from "../domain/input";

// Generated interacting with openai-gpt-4o, then fixing extractOptions method and refactoring the class bit.

export class UnknownOptionError extends Error {
    constructor(option: string) {
        super(`Unknown option: "${option}"`);
        this.name = "UnknownOptionError";
    }
}

const AllowedOptionKeys = ["noshow", "minfreq", "max", "nowordsinfile"] as const;

type AllowedOptionKeysType = (typeof AllowedOptionKeys)[number];

export class InputParser {
    private REGEX: { options: RegExp; incompleteOption: RegExp; hasOptions: RegExp } = {
        options: /--(\w+)=\[(.*?)\]|--(\w+)=["']?([^,]+?)["']?(?=\s|$)/g, // Match key=value or key=[values]
        hasOptions: /--/, // Match presence of options (e.g., --key=value)
        incompleteOption: /--\w+=(\s|$)|--\w+(\s|$)/, // Match incomplete/malformed options
    };
    private ERRORS: { invalidArgument: (option: string) => string } = {
        invalidArgument: (option: string) =>
            `Invalid or missing argument in option: "${option.trim()}"`,
    };

    parseInput(input: string): Input {
        if (this.doesNotIncludeOptions(input)) {
            return {text: input.trim(), options: {}};
        }

        this.validateInput(input);

        return {
            text: this.extractText(input),
            options: this.extractOptions(input)
        };
    }

    private doesNotIncludeOptions(input: string) {
        return !this.REGEX.hasOptions.test(input);
    }

    private validateInput(input: string): void {
        const invalidOptionMatch = input.match(this.REGEX.incompleteOption);
        if (invalidOptionMatch) {
            throw new Error(this.ERRORS.invalidArgument(invalidOptionMatch[0]));
        }
    }

    private extractText(input: string): string {
        const textMatch = input.match(/^(.*?)\s(?=--)/);
        return textMatch ? textMatch[1].trim() + " " : input.trim() + " ";
    }

    private extractOptions(input: string): Options {
        let match;
        let options: Options = {};

        while ((match = this.REGEX.options.exec(input)) !== null) {
            const key: AllowedOptionKeysType = (match[1] || match[3]) as AllowedOptionKeysType; // Key from either cases (--key=[value] | --key=value)

            if (!AllowedOptionKeys.includes(key)) {
                throw new UnknownOptionError(key);
            }

            options = this.addValueFor(key, match, options);
        }

        return options;
    }

    private addValueFor(key: AllowedOptionKeysType, match: RegExpExecArray, options: Options): Options {
        if (key === "noshow") {
            options.noShow = this.extractArrayLikeValueFrom(match[2]);
        } else if (key === "nowordsinfile") {
            options.noWordsInFile = match[4].toString();
        } else if (key === "minfreq") {
            options.minFreq = Number(match[4]);
        } else if (key === "max") {
            options.max = Number(match[4]);
        }
        return options;
    }

    private extractArrayLikeValueFrom(rawValue: string): any[] | string[] {
        if (rawValue) {
            return rawValue.length > 0 ? rawValue.split(",") : [];
        }
        return [];
    }
}