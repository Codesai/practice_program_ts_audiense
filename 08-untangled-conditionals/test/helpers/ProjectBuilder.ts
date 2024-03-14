import {TestStatus} from "../../src/dependencies/TestStatus";
import {Project} from "../../src/dependencies/Project";

export function aProject() {
    return new ProjectBuilder();
}
export class ProjectBuilder {
    private buildsSuccessfully: boolean;
    private testStatus: TestStatus;

    setTestStatus(testStatus: TestStatus): ProjectBuilder {
        this.testStatus = testStatus;
        return this;
    }

    setDeploysSuccessfully(buildsSuccessfully: boolean): ProjectBuilder {
        this.buildsSuccessfully = buildsSuccessfully;
        return this;
    }

    build(): Project {
        return new Project(this.buildsSuccessfully, this.testStatus);
    }
}