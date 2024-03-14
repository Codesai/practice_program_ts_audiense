import {anyString, verify} from "ts-mockito";
import {DrinkMaker800} from "../../src/infrastructure/drink-maker-800";
import {captureLast} from "./ts-mockito-helper";

export function checkThat(drinkMaker: DrinkMaker800) {
    const lastCommandFunctions = createLastCommandFunctions(drinkMaker);
    return {
        onlyReceivedCommand: () => {
            verify(drinkMaker.execute(anyString())).once();
            return lastCommandFunctions;
        }
    };
}
function createLastCommandFunctions(drinkMaker: DrinkMaker800) {
    return {
        was(command: string): void {
            expect(captureLast(drinkMaker.execute)).toEqual(command);
        }
    }
}