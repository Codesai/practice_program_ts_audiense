import {ActivityLog} from "../../src/domain/ActivityLog";
import { Code } from "../../src/domain/Code";
import { EmployeeId } from "../../src/domain/EmployeeId";
import {RegistryService} from "../../src/domain/RegistryService";
import {aCode, anActivity, anEmployeeId} from "../helpers/SystemVaultHelpers";
import {Activity} from "../../src/domain/Activity";

class WithActivityLogRegistryService implements RegistryService {
  private readonly activityLog: ActivityLog;
  private readonly registryService: RegistryService;

  constructor(activityLog: ActivityLog, registryService: RegistryService) {
    this.activityLog = activityLog;
    this.registryService = registryService;
  }

  canUnlock(code: Code, id: EmployeeId): boolean {
    const canUnlock = this.registryService.canUnlock(code, id);

    if (!canUnlock) {
      this.activityLog.log(new Activity("Access denied, incorrect code", id));
    }

    return canUnlock;
  }
}

describe('WithActivityLogRegistryService', () =>{

  let activityLog: jest.Mocked<ActivityLog>;
  let registryService: jest.Mocked<RegistryService>;
  let withActivityLogRegistryService: WithActivityLogRegistryService;

  const employeeId = anEmployeeId("123456789");


  beforeEach(() => {
    activityLog = {log: jest.fn()};
    registryService = {canUnlock: jest.fn()};
    withActivityLogRegistryService= new WithActivityLogRegistryService(activityLog, registryService);
  })

  it('when it allows to unlock it should log nothing', ()=> {
    registryService.canUnlock.mockReturnValueOnce(true);

    const result = withActivityLogRegistryService.canUnlock(aCode(), employeeId);

    expect(result).toBe(true);
  })

  it('when it doesnt allow to unlock it should log access denied', ()=> {
    registryService.canUnlock.mockReturnValueOnce(false);

    const result = withActivityLogRegistryService.canUnlock(aCode(), employeeId);

    expect(result).toBe(false);
    expect(activityLog.log).toHaveBeenCalledWith(anActivity("Access denied, incorrect code", employeeId));
  })

})