import {EmployeeId} from "./EmployeeId";

export interface Door {
    unlockFor(id: EmployeeId): void;

    isJammed(): boolean;
}

