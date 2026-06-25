import {Display} from "../../src/domain/Display";
import {AccessEventsPublisherFactory} from "../../src/domain/factories/AccessEventsPublisherFactory";
import {AccessEvents} from "../../src/domain/AccessEvents";
import {AccessEventsPublisher} from "../../src/domain/AccessEventsPublisher";

describe('AccessEventsPublisher in all languages', () => {
    let display: jest.Mocked<Display>;

    beforeEach(() => {
        display = {show: jest.fn()};
    });

    it.each([
        [AccessEventsPublisherFactory.createEnglishVersion, 'You shall not pass!'],
        [AccessEventsPublisherFactory.createSpanishVersion, '¡No pasarás!']
    ])('publishes the "invalid code" message in English', (createEventPublisher: (display: Display) => AccessEventsPublisher, expectedMessage: string) => {
        const publisher = createEventPublisher(display);

        publisher.publish(AccessEvents.invalidCode);

        expect(display.show).toHaveBeenCalledWith(expectedMessage);
    });

    it.each([
        [AccessEventsPublisherFactory.createEnglishVersion, 'Door is jammed, could not unlock'],
        [AccessEventsPublisherFactory.createSpanishVersion, 'La puerta está atascada, no se pudo abrir']
    ])('publishes the "door jammed" message in English', (createEventPublisher: (display: Display) => AccessEventsPublisher, expectedMessage: string) => {
        const publisher = createEventPublisher(display);

        publisher.publish(AccessEvents.doorJammed);

        expect(display.show).toHaveBeenCalledWith(expectedMessage);
    });
});
