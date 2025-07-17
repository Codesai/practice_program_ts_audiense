import {
    CaseInSensitiveKeyGenerator
} from "../../../../src/domain/wordRankers/keyGenerators/caseInSensitiveKeyGenerator";

describe('Case insensitive key generator', () => {
    test.each([
        {input: "LoLO", expected: "lolo"},
        {input: "HELLO", expected: "hello"},
        {input: "WoRlD", expected: "world"},
        {input: "test", expected: "test"}
    ])('should convert "$input" to "$expected"', ({input, expected}) => {
        const keyGenerator = new CaseInSensitiveKeyGenerator();
        expect(keyGenerator.getKeyFrom(input)).toEqual(expected);
    });
});