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
    projects: [
        {
            displayName: 'all',
            testMatch: ['**/*.spec.ts'],
        },
        {
            displayName: 'unit',
            testMatch: [
                '**/*.spec.ts',
            ],
            testPathIgnorePatterns : ['<rootDir>/tests/infrastructure/integration/']
        },
        {
            displayName: 'integration',
            testMatch: ['<rootDir>/tests/infrastructure/integration/*.spec.ts'],
        }
    ]
};