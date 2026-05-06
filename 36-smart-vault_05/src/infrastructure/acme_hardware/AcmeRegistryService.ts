import {RegistryService} from "../../domain/RegistryService";
import {Code} from "../../domain/Code";
import {EmployeeId} from "../../domain/EmployeeId";

export class AcmeRegistryService implements RegistryService {
    canUnlock(code: Code, id: EmployeeId): boolean {
        return true;
    }
}
