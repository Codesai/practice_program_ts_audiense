/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    coverageDirectory: "reports/coverage",
    coverageReporters: ["lcov", "text"],
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    testPathIgnorePatterns: [
        "<rootDir>/build/",
        "<rootDir>/node_modules/",
        "<rootDir>/.stryker-tmp"
    ],
};