import {Display} from "../Display";
import {AccessEventsPublisher} from "../AccessEventsPublisher";
import {AccessEvents} from "../AccessEvents";
import {Dictionary} from "../Dictionary";
import {DictionaryBasedAccessEventsPublisher} from "../DictionaryBasedAccessEventsPublisher";

export enum DisplayedLanguage {
    ENGLISH, SPANISH
}

export class AccessEventsPublisherFactory {
    static createSpanishVersion(display: Display): AccessEventsPublisher {
        return new DictionaryBasedAccessEventsPublisher(
            new Dictionary(new Map([
                [AccessEvents.invalidCode, '¡No pasarás!'],
                [AccessEvents.doorJammed, 'La puerta está atascada, no se pudo abrir']
            ])),
            display
        );
    };

    static createEnglishVersion(display: Display): AccessEventsPublisher {
        return new DictionaryBasedAccessEventsPublisher(
            new Dictionary(new Map([
                [AccessEvents.invalidCode, 'You shall not pass!'],
                [AccessEvents.doorJammed, 'Door is jammed, could not unlock']
            ])),
            display
        );
    }

    static create(display: Display, displayedLanguage: DisplayedLanguage): AccessEventsPublisher {
        switch (displayedLanguage) {
            case DisplayedLanguage.ENGLISH:
                return this.createEnglishVersion(display);
            case DisplayedLanguage.SPANISH:
                return this.createSpanishVersion(display);
                default:
                    throw new Error('Unsupported display language');
        }
    }
}
