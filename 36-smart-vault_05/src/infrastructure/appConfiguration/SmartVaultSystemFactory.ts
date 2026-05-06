import {SmartVaultSystem} from "../../domain/SmartVaultSystem";
import {AcmeDoorMechanism} from "../acme_hardware/AcmeDoorMechanism";
import {AcmeActivityLog} from "../acme_hardware/AcmeActivityLog";
import {AcmeDisplay} from "../acme_hardware/AcmeDisplay";
import {AcmeRegistryService} from "../acme_hardware/AcmeRegistryService";
import {AcmeInventoryScanner} from "../acme_hardware/AcmeInventoryScanner";
import {AcmeCommunicationsTerminal} from "../acme_hardware/AcmeCommunicationsTerminal";

export class SmartVaultSystemFactory {
    static create(): SmartVaultSystem {
        return new SmartVaultSystem(
            new AcmeDoorMechanism(),
            new AcmeActivityLog(),
            new AcmeDisplay(),
            new AcmeRegistryService(),
            new AcmeInventoryScanner(),
            new AcmeCommunicationsTerminal()
        );
    }
}
