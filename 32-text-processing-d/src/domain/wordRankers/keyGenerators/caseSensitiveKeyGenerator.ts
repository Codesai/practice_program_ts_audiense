import {KeyGenerator} from "../keyGenerator";

export class CaseSensitiveKeyGenerator implements KeyGenerator {
    getKeyFrom(word: string): string {
        return word;
    }
}