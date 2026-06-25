import {AccessEvents, AccessEventsPublisher} from "./AccessEventsPublisher";
import {Display} from "./Display";

export class EnglishAccessEventsPublisher implements AccessEventsPublisher {
    private display: Display;
    private messages: Dictionary;

    constructor(display: Display) {
        this.display = display;
        this.messages = new Dictionary(new Map([
            [AccessEvents.invalidCode, 'You shall not pass!'],
            [AccessEvents.doorJammed, 'Door is jammed, could not unlock']
        ]));
    }

    publish(event: AccessEvents): void {
        this.display.show(this.messages.get(event)!);
    }
}

class Dictionary {
    private map: Map<AccessEvents, string>;

    constructor(map: Map<AccessEvents, string>) {
        this.map = map;
    }

    get(event: AccessEvents): string | undefined {
        return this.map.get(event);
    }
}