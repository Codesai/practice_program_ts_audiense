import {SmartVaultSystem} from "../../domain/SmartVaultSystem";
import {RegistryServiceFactory} from '../../domain/factories/RegistryServiceFactory';
import {DoorFactory} from '../../domain/factories/DoorFactory';
import {ActivityLog} from "../../domain/ActivityLog";
import {RegistryService} from "../../domain/RegistryService";
import {CommunicationsTerminal} from "../../domain/CommunicationsTerminal";
import {InventoryScanner} from "../../domain/InventoryScanner";
import {DoorMechanism} from "../../domain/DoorMechanism";
import {InventoryManagerFactory} from "./InventoryManagerFactory";
import {Display} from "../../domain/Display";
import {AccessEventsPublisherFactory, DisplayedLanguage} from "../../domain/factories/AccessEventsPublisherFactory";

export class SmartVaultSystemFactory {
    static create(
        activityLog: ActivityLog,
        registryService: RegistryService,
        doorMechanism: DoorMechanism,
        inventoryScanner: InventoryScanner,
        communicationsTerminal: CommunicationsTerminal,
        display: Display,
        displayedLanguage: DisplayedLanguage
    ): SmartVaultSystem {
        const eventsPublisher = AccessEventsPublisherFactory.create(display, displayedLanguage);
        return new SmartVaultSystem(
            RegistryServiceFactory.create(activityLog, registryService),
            DoorFactory.create(doorMechanism, activityLog),
            InventoryManagerFactory.create(inventoryScanner, communicationsTerminal),
            eventsPublisher
        );
    }
}
