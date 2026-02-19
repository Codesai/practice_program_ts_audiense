import {DependOnFileCondition, projectFiles} from "archunit";

describe("Architecture Rules", () => {
    it("domain should not depend on infrastructure", async () => {
        const rule = projectFiles()
            .inFolder('src/domain/**')
            .shouldNot()
            .dependOnFiles()
            .inFolder("src/infrastructure/**");
        await expect(rule).toPassAsync();
    });

    it("sanity check: infrastructure depends on domain (should fail this rule)", async () => {
        const rule = projectFiles()
            .inFolder("src/infrastructure/**")
            .shouldNot()
            .dependOnFiles()
            .inFolder("src/domain/**");

        await expectRuleToFail(rule);
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

    async function expectRuleToFail(rule: DependOnFileCondition) {
        await expect(expect(rule).toPassAsync()).rejects.toThrow();
    }
});