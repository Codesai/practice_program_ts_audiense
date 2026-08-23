/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageDirectory: "reports/coverage",
    coverageReporters: ["lcov", "text"],
    collectCoverageFrom: [
        "src/**/*.{js,ts}"
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "<rootDir>/build/"
    ],
};