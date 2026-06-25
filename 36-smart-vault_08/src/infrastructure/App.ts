import {SmartVaultSystemFactory} from "./appConfiguration/SmartVaultSystemFactory";
import {Code} from "../domain/Code";
import {EmployeeId} from "../domain/EmployeeId";
import {SmartVaultSystem} from "../domain/SmartVaultSystem";
import {AcmeActivityLog} from "./acme_hardware/AcmeActivityLog";
import {AcmeRegistryService} from "./acme_hardware/AcmeRegistryService";
import {AcmeDoorMechanism} from "./acme_hardware/AcmeDoorMechanism";
import {AcmeInventoryScanner} from "./acme_hardware/AcmeInventoryScanner";
import {AcmeCommunicationsTerminal} from "./acme_hardware/AcmeCommunicationsTerminal";
import {AcmeDisplay} from "./acme_hardware/AcmeDisplay";

import {DisplayedLanguage} from "../domain/factories/AccessEventsPublisherFactory";

const smartVaultSystem = createSmartVaultSystem();

smartVaultSystem.onCodeIntroduced(new Code(), new EmployeeId("koko"));

smartVaultSystem.onDoorClosed();

function createSmartVaultSystem(): SmartVaultSystem {
    const activityLog = new AcmeActivityLog();
    const registryService = new AcmeRegistryService();
    const doorMechanism = new AcmeDoorMechanism();
    const inventoryScanner = new AcmeInventoryScanner();
    const communicationsTerminal = new AcmeCommunicationsTerminal();
    const display = new AcmeDisplay();
    return SmartVaultSystemFactory.create(
        activityLog,
        registryService,
        doorMechanism,
        inventoryScanner,
        communicationsTerminal,
        display,
        DisplayedLanguage.ENGLISH
    );
}