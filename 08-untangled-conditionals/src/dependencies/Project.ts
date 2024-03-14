import {TestStatus} from "./TestStatus";

export class Project {
    private readonly buildsSuccessfully: boolean;
    private readonly testStatus: TestStatus;

    constructor(buildsSuccessfully: boolean, testStatus: TestStatus) {
        this.buildsSuccessfully = buildsSuccessfully;
        this.testStatus = testStatus;
    }

    hasTests(): boolean {
        return this.testStatus != TestStatus.NO_TESTS;
    }

    runTests(): string {
        return this.testStatus == TestStatus.PASSING_TESTS ? "success" : "failure";
    }

    deploy(): string {
        return this.buildsSuccessfully ? "success" : "failure";
    }
}
