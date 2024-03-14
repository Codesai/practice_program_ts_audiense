import {instance, mock} from "ts-mockito";
import {Model800DrinkMakerDriver} from "../src/infrastructure/model-800-drink-maker-driver";
import {DrinkMaker800} from "../src/infrastructure/drink-maker-800";
import {aCoffee, aHotChocolate, anOrangeJuice, aTea} from "./helpers/order-builder";
import {checkThat} from "./helpers/drink-maker-checks";

describe("Model800 driver", () => {
    let drinkMaker: DrinkMaker800;
    let model800: Model800DrinkMakerDriver;

    beforeEach(() => {
        drinkMaker = mock<DrinkMaker800>();
        model800 = new Model800DrinkMakerDriver(instance(drinkMaker));
    });

    describe("makes", () => {
        it.each([
            {
                title: "coffee",
                order: aCoffee().make(),
                command: "C::",
            },
            {
                title: "tea",
                order: aTea().make(),
                command: "T::",
            },
            {
                title: "chocolate",
                order: aHotChocolate().make(),
                command: "H::",
            },
            {
                title: "juice",
                order: anOrangeJuice().make(),
                command: "O::",
            },
            {
                title: "drink with a spoon of sugar",
                order: aHotChocolate().withSpoonsOfSugar(1).make(),
                command: "H:1:0",
            },
            {
                title: "an extra hot drink",
                order: aTea().extraHot().make(),
                command: "Th::",
            },
        ])("a $title", ({order, command: expectedCommand}) => {
            model800.make(order);

            checkThat(drinkMaker).onlyReceivedCommand().was(expectedCommand);
        });
    });

    it("notifies the user", () => {
        const message = "any message";
        model800.notifyUser(message);

        checkThat(drinkMaker).onlyReceivedCommand().was(`M:${message}`);
    });
});
