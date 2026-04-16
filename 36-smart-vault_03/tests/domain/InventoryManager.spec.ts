import {CommunicationTerminal} from "../../src/domain/CommunicationTerminal";
import {InventoryScanner} from "../../src/domain/InventoryScanner";
import {InventoryManager, AutomaticInventoryManager} from "../../src/domain/InventoryManager";

describe('SmartVaultSystem', () => {
  let communicationTerminal: jest.Mocked<CommunicationTerminal>;
  let inventoryScanner: jest.Mocked<InventoryScanner>;
  let inventoryManager: InventoryManager;

  beforeEach(() => {
    communicationTerminal= {restockOrder: jest.fn(), emergencyAlert: jest.fn()};
    inventoryScanner = {remainingStock: jest.fn()};
    inventoryManager = new AutomaticInventoryManager(inventoryScanner, communicationTerminal);
  })

  it('as a supplier I want to be notified when the door closes and the stock is 5 or less', ()=> {
    inventoryScanner.remainingStock.mockReturnValueOnce(5);

    inventoryManager.restockIfNeeded();

    expect(communicationTerminal.restockOrder).toHaveBeenCalled();
  })

  it('as a supplier I dont want to be notified when the door closes and the stock is 5 or less', ()=> {
    inventoryScanner.remainingStock.mockReturnValueOnce(6);

    inventoryManager.restockIfNeeded();

    expect(communicationTerminal.restockOrder).not.toHaveBeenCalled();
  })

  it('as a supplier I want to receive an emergency alert when stock is exactly 0', ()=> {
    inventoryScanner.remainingStock.mockReturnValueOnce(0);

    inventoryManager.restockIfNeeded();

    expect(communicationTerminal.restockOrder).not.toHaveBeenCalled();
    expect(communicationTerminal.emergencyAlert).toHaveBeenCalled();
  })

});

