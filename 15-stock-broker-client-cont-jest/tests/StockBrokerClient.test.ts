import {StockBrokerClient} from "../src/StockBrokerClient";
import {Printer} from "../src/Printer";
import {Calendar} from "../src/Calendar";
import {OrderDto} from "../src/OrderDto";
import {StockBrokerOnline} from "../src/StockBrokerOnline";

describe("Stock Broker client\n", () => {
    let stockBrokerOnline: StockBrokerOnline;
    let printer: Printer;
    let calendar: any;
    let stockBrokerClient: StockBrokerClient;

    beforeEach(() => {
        stockBrokerOnline = {buy: jest.fn()};
        printer = {write: jest.fn()};
        calendar = {now: jest.fn()};
        stockBrokerClient = new StockBrokerClient(printer, calendar as Calendar, stockBrokerOnline);
    });

    it("should print by console the orders summary with the correct date", () => {
        calendar.now.mockReturnValue(date(2024, 7, 6, 15, 55))

        stockBrokerClient.placeOrders("");

        expect(printer.write).toHaveBeenCalledWith("8/6/2024 3:55 PM Buy: € 0.00, Sell: € 0.00")
    });

    it('should place an order', () => {
        calendar.now.mockReturnValue(date(2024, 7, 15, 15, 55))

        stockBrokerClient.placeOrders("GOOG 2 3 B");

        expect(printer.write).toHaveBeenCalledWith("8/15/2024 3:55 PM Buy: € 6.00, Sell: € 0.00")
        expect(stockBrokerOnline.buy).toHaveBeenCalledWith(new OrderDto('GOOG', 2, 3));
    });

});

function date(year: number, month: number, day: number, hour: number, minute: number): Date {
    return new Date(year, month, day, hour, minute);
}
