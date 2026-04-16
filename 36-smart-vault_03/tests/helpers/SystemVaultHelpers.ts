import {EmployeeId} from "../../src/domain/EmployeeId";
import {Code} from "../../src/domain/Code";
import {Activity} from "../../src/domain/Activity";

export function anEmployeeId(value: string): EmployeeId {
  return new EmployeeId(value);
}

export function aCode(): Code {
  return new Code();
}

export function anActivity(message: string, employeeId: EmployeeId): Activity {
  return new Activity(message, employeeId);
}