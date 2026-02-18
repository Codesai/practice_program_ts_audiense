import {filesOfProject} from "tsarch";

describe("Architecture Rules", () => {
    it("domain should not depend on infrastructure", async () => {
        const violations = await filesOfProject()
            .inFolder("src/domain")
            .shouldNot()
            .dependOnFiles()
            .inFolder("src/infrastructure")
            .check();

        expect(violations).toEqual([]);
    });

    it("production code should not have circular dependencies", async () => {
        const violations = await filesOfProject()
            .inFolder("src")
            .should()
            .beFreeOfCycles()
            .check();

        expect(violations).toEqual([]);
    });
});