import {CommunicationsTerminal, Order} from "../../src/domain/CommunicationsTerminal";
import {InventoryScanner} from "../../src/domain/InventoryScanner";
import {InventoryManager} from "../../src/domain/InventoryManager";
import {InventoryManagerFactory} from "../../src/infrastructure/appConfiguration/InventoryManagerFactory";

describe('inventory manager', () => {
    let inventoryScanner: jest.Mocked<InventoryScanner>;
    let communicationsTerminal: jest.Mocked<CommunicationsTerminal>;
    let inventoryManager: InventoryManager;

    beforeEach(() => {
        inventoryScanner = {numberOfItems: jest.fn()};
        communicationsTerminal = {route: jest.fn()};
        inventoryManager = InventoryManagerFactory.create(inventoryScanner, communicationsTerminal)
    })

    it.each([
        1,
        5]
    )('when there are 5 or less items in the inventory, a restock order is routed (numberOfItems: %i)', (numberOfItems) => {
        inventoryScanner.numberOfItems.mockReturnValueOnce(numberOfItems);

        inventoryManager.ensureStock()

        expect(communicationsTerminal.route).toHaveBeenCalledWith(Order.RESTOCK);
        expect(communicationsTerminal.route).not.toHaveBeenCalledWith(Order.EMERGENCY_ALERT);
    })

    it('when there more than 5 in the inventory, nothing happens', () => {
        inventoryScanner.numberOfItems.mockReturnValueOnce(6);

        inventoryManager.ensureStock()

        expect(communicationsTerminal.route).not.toHaveBeenCalled();
    })

    it('when the inventory is empty, both a restock order and an emergency alert order are routed', () => {
        inventoryScanner.numberOfItems.mockReturnValueOnce(0);

        inventoryManager.ensureStock();

        expect(communicationsTerminal.route).toHaveBeenCalledWith(Order.RESTOCK);
        expect(communicationsTerminal.route).toHaveBeenCalledWith(Order.EMERGENCY_ALERT);
    })
});
