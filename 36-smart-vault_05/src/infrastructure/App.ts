import {SmartVaultSystemFactory} from "./appConfiguration/SmartVaultSystemFactory";
import {Code} from "../domain/Code";
import {EmployeeId} from "../domain/EmployeeId";

const smartVaultSystem = SmartVaultSystemFactory.create();

smartVaultSystem.onCodeIntroduced(new Code(), new EmployeeId("koko"));

smartVaultSystem.onDoorClosed();
