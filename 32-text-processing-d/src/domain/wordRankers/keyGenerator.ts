export interface KeyGenerator {
    getKeyFrom(word: string): string;
}