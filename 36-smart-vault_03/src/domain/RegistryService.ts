import {EmployeeId} from "./EmployeeId";
import {Code} from "./Code";

export interface RegistryService {
    canUnlock(code: Code, id: EmployeeId): boolean;
}
