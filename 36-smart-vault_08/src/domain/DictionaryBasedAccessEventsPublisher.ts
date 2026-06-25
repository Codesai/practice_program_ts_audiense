import {AccessEventsPublisher} from "./AccessEventsPublisher";
import {Dictionary} from "./Dictionary";
import {Display} from "./Display";
import {AccessEvents} from "./AccessEvents";

export class DictionaryBasedAccessEventsPublisher implements AccessEventsPublisher {
    private readonly dictionary: Dictionary;
    private readonly display: Display;

    constructor(dictionary: Dictionary, display: Display) {
        this.display = display;
        this.dictionary = dictionary;
    }

    publish(event: AccessEvents): void {
        this.display.show(this.dictionary.get(event));
    }
}
