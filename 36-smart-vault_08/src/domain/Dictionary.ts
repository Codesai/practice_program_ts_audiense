import {AccessEvents} from "./AccessEvents";

export class Dictionary {
    private readonly dictionary: Map<AccessEvents, string>;

    constructor(dictionary: Map<AccessEvents, string>) {
        Dictionary.validateDictionary(dictionary);
        this.dictionary = dictionary;
    }

    get(event: AccessEvents): string {
        return this.dictionary.get(event) ?? '';
    }

    private static validateDictionary(dictionary: Map<AccessEvents, string>): void {
        const allEvents = Object.values(AccessEvents);
        const missingKeys = allEvents.filter(event => !dictionary.has(event));

        if (missingKeys.length > 0) {
            throw new Error(`Dictionary is missing a description for the following access events: ${missingKeys.join(', ')}`);
        }
    }
}
