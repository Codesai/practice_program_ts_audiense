import {projectFiles} from "archunit";

describe("Architecture Rules", () => {
    it.skip("domain should not depend on infrastructure", async () => {
        const rule = projectFiles()
            .inFolder('src/domain/**')
            .shouldNot()
            .dependOnFiles()
            .inFolder("src/infrastructure/**");

        await expect(rule).toPassAsync();
    });

    it("production code should not have circular dependencies", async () => {
        const rule = projectFiles()
            .inFolder("src/**")
            .should()
            .haveNoCycles();

        await expect(rule).toPassAsync();
    });

    it("production code should not depend on tests", async () => {
        const rule = projectFiles()
            .inFolder('src/**')
            .shouldNot()
            .dependOnFiles()
            .inFolder("tests/**");

        await expect(rule).toPassAsync();
    });
});