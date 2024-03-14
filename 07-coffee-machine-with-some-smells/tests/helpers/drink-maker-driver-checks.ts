import {anyOfClass, anyString, capture, verify} from "ts-mockito";
import { DrinkMakerDriver } from "../../src/drink-maker-driver";
import { Order } from "../../src/order";
import {captureLast} from "./ts-mockito-helper";

export function checkThat(drinkMakerDriver: DrinkMakerDriver) {
    const lastOrderFunctions = createLastOrderFunctions(drinkMakerDriver);
    const lastNotificationFunctions = createLastNotificationFunctions(drinkMakerDriver);
    return {
        onlyReceivedOrder: () => {
            verify(drinkMakerDriver.make(anyOfClass(Order))).once();
            return lastOrderFunctions;
        },
        lastReceivedOrder: () => lastOrderFunctions,
        onlyReceivedNotification: () => {
            verify(drinkMakerDriver.notifyUser(anyString())).once();
            return lastNotificationFunctions;
        },
        lastReceivedNotification: () => lastNotificationFunctions,
    }
}

function createLastNotificationFunctions(drinkMakerDriver: DrinkMakerDriver) {
    return {
        containsMissingMoney: (inCents: number): void => {
            expect(lastNotification(drinkMakerDriver)).toMatch(messageContaining(money(inCents).toString()));
        },
        contains: (message: string): void => {
            expect(lastNotification(drinkMakerDriver)).toMatch(messageContaining(message));
        }
    }
};

function createLastOrderFunctions(drinkMakerDriver: DrinkMakerDriver) {
    return {
        was: (order: Order): void => {
            expect(order).toStrictEqual(lastOrder(drinkMakerDriver));
        }
    };
};

function lastOrder(drinkMakerDriver: DrinkMakerDriver): Order {
    return captureLast(drinkMakerDriver.make);
}

function lastNotification(drinkMakerDriver: DrinkMakerDriver): string {
    return captureLast(drinkMakerDriver.notifyUser);
}

function messageContaining(message: string): RegExp {
    return new RegExp(`.*${message}.*`);
}

function money(inCents: number): number {
    return inCents / 100;
}


