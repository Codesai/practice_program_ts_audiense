import {EmployeeId} from "./EmployeeId";

export class Activity {
    private readonly message: string;
    private readonly employeeId: EmployeeId;

    constructor(message: string, employeeId: EmployeeId) {
        this.employeeId = employeeId;
        this.message = message;
    }
}
