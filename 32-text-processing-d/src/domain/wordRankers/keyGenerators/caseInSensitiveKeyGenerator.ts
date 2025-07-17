import {KeyGenerator} from "../keyGenerator";

export class CaseInSensitiveKeyGenerator implements KeyGenerator {
    getKeyFrom(word: string): string {
        return word.toLowerCase();
    }
}