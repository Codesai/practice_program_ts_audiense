import {instance, mock} from "ts-mockito";
import {CoffeeMachine} from "../src/coffee-machine";
import {Drink} from "../src/drink";
import {DrinkMakerDriver} from "../src/drink-maker-driver";
import {aCoffee, aHotChocolate, anOrangeJuice, aTea} from "./helpers/order-builder";
import {checkThat} from "./helpers/drink-maker-driver-checks";

describe("Coffee Machine", () => {
    let drinkMakerDriver: DrinkMakerDriver;
    let coffeeMachine: CoffeeMachine;

    describe("with enough money", () => {
        beforeEach(() => {
            drinkMakerDriver = mock<DrinkMakerDriver>();
            coffeeMachine = aFreeCoffeeMachine(instance(drinkMakerDriver));
        });

        it("makes a coffee", () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedOrder().was(aCoffee().make());
        });

        it("makes a tea", () => {
            coffeeMachine.selectTea();
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedOrder().was(aTea().make());
        });

        it("makes a hot chocolate", () => {
            coffeeMachine.selectChocolate();
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedOrder().was(aHotChocolate().make());
        });

        it("makes an orange juice", () => {
            coffeeMachine.selectOrangeJuice();
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedOrder().was(anOrangeJuice().make());
        });

        it("makes a drink with one spoon of sugar", () => {
            coffeeMachine.selectChocolate();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedOrder().was(
                aHotChocolate().withSpoonsOfSugar(1).make());
        });

        it("makes a drink with two spoons of sugar", () => {
            coffeeMachine.selectChocolate();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedOrder().was(
                aHotChocolate().withSpoonsOfSugar(2).make());
        });

        it("makes a drink with more than two spoons of sugar", () => {
            coffeeMachine.selectChocolate();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedOrder().was(
                aHotChocolate().withSpoonsOfSugar(2).make());
        });
    });

    describe("with not enough money", () => {
        beforeEach(() => {
            const priceTable: Record<Drink, number> = {
                [Drink.Coffee]: 0.6,
                [Drink.Tea]: 0.4,
                [Drink.Chocolate]: 0.5,
                [Drink.OrangeJuice]: 0.6,
            };
            drinkMakerDriver = mock<DrinkMakerDriver>();
            coffeeMachine = aCoffeeMachine(priceTable, instance(drinkMakerDriver));
        });

        it("does not make a coffee", () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.1);
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedNotification().containsMissingMoney(50);
        });

        it("does not make a tea", () => {
            coffeeMachine.selectTea();
            coffeeMachine.addMoney(0.2);
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedNotification().containsMissingMoney(20);
        });

        it("does not make a hot chocolate", () => {
            coffeeMachine.selectChocolate();
            coffeeMachine.addMoney(0.4);
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedNotification().containsMissingMoney(10);
        });

        it("does not make an orange juice", () => {
            coffeeMachine.selectOrangeJuice();
            coffeeMachine.addMoney(0.5);
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedNotification().containsMissingMoney(10);
        });
    });

    describe("selecting extra hot drinks", () => {
        beforeEach(() => {
            drinkMakerDriver = mock<DrinkMakerDriver>();
            coffeeMachine = aFreeCoffeeMachine(instance(drinkMakerDriver));
        });

        it("make any extra hot drink", () => {
            coffeeMachine.selectTea();
            coffeeMachine.selectExtraHot();
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedOrder().was(aTea().extraHot().make());
        });

        it("an orange juice can not be extra hot", () => {
            coffeeMachine.selectOrangeJuice();
            coffeeMachine.selectExtraHot();
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).onlyReceivedOrder().was(anOrangeJuice().make());
        });
    });

    describe("resets after making a drink", () => {

        beforeEach(() => {
            const priceTable: Record<Drink, number> = {
                [Drink.Coffee]: 0.6,
                [Drink.Tea]: 0.4,
                [Drink.Chocolate]: 0.5,
                [Drink.OrangeJuice]: 0.6,
            };
            drinkMakerDriver = mock<DrinkMakerDriver>();
            coffeeMachine = aCoffeeMachine(priceTable, instance(drinkMakerDriver));
        });

        it("to avoid getting a free drink in the next order", () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.6);
            coffeeMachine.makeDrink();

            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).lastReceivedNotification().contains("Select a drink, please");
        });

        it("to avoid previous money insertion to leak into the next order", () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.6);
            coffeeMachine.makeDrink();

            coffeeMachine.selectCoffee();
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).lastReceivedNotification().containsMissingMoney(60);
        });

        it("to avoid previous sugar selection to leak into the next order", () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.6);
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.makeDrink();

            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.6);
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).lastReceivedOrder().was(aCoffee().make());
        });

        it("to avoid previous extra hot selection to leak into the next order", () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.6);
            coffeeMachine.selectExtraHot();
            coffeeMachine.makeDrink();

            coffeeMachine.selectCoffee();
            coffeeMachine.addMoney(0.6);
            coffeeMachine.makeDrink();

            checkThat(drinkMakerDriver).lastReceivedOrder().was(aCoffee().make());
        });
    });
});

function aCoffeeMachine(
    priceTable: Record<Drink, number>,
    drinkMakerDriver: DrinkMakerDriver
): CoffeeMachine {
    return new CoffeeMachine(priceTable, drinkMakerDriver)
}

function aFreeCoffeeMachine(drinkMakerDriver: DrinkMakerDriver): CoffeeMachine {
    const priceTable: Record<Drink, number> = {
        [Drink.Coffee]: 0.0,
        [Drink.Tea]: 0.0,
        [Drink.Chocolate]: 0.0,
        [Drink.OrangeJuice]: 0.0,
    };
    return new CoffeeMachine(priceTable, drinkMakerDriver)
}
