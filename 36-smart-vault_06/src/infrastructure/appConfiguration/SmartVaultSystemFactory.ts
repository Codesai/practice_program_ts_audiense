import {SmartVaultSystem} from "../../domain/SmartVaultSystem";
import {RegistryServiceFactory} from '../../domain/factories/RegistryServiceFactory';
import {DoorFactory} from '../../domain/factories/DoorFactory';
import {ActivityLog} from "../../domain/ActivityLog";
import {RegistryService} from "../../domain/RegistryService";
import {CommunicationsTerminal} from "../../domain/CommunicationsTerminal";
import {InventoryScanner} from "../../domain/InventoryScanner";
import {DoorMechanism} from "../../domain/DoorMechanism";
import {Display} from "../../domain/Display";
import {InventoryManagerFactory} from "./InventoryManagerFactory";

export class SmartVaultSystemFactory {
    public static create(
        activityLog: ActivityLog,
        registryService: RegistryService,
        doorMechanism: DoorMechanism,
        inventoryScanner: InventoryScanner,
        communicationsTerminal: CommunicationsTerminal,
        display: Display): SmartVaultSystem {
        return new SmartVaultSystem(
            display,
            RegistryServiceFactory.create(activityLog, registryService),
            DoorFactory.create(doorMechanism, activityLog),
            InventoryManagerFactory.create(inventoryScanner, communicationsTerminal)
        );
    }
}
