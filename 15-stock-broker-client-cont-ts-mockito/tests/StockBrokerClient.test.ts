import {StockBrokerClient} from "../src/StockBrokerClient";
import {capture, instance, mock, verify, when} from "ts-mockito";
import {Printer} from "../src/Printer";
import {Calendar} from "../src/Calendar";
import {OrderDto} from "../src/OrderDto";
import {StockBrokerOnline} from "../src/StockBrokerOnline";

describe("Stock Broker client\n", () => {
    let printer: Printer;
    let calendar: Calendar;
    let stockBrokerOnline: StockBrokerOnline;
    let stockBrokerClient: StockBrokerClient;

    beforeEach(() => {
        printer = mock<Printer>();
        calendar = mock<Calendar>();
        stockBrokerOnline = mock<StockBrokerOnline>();
        stockBrokerClient = new StockBrokerClient(instance(printer), instance(calendar), instance(stockBrokerOnline));
    });

    it("should print by console the orders summary with the correct date", () => {
        when(calendar.now()).thenReturn(date(2024, 7, 6, 15, 55));

        stockBrokerClient.placeOrders("");

        verify(printer.write("8/6/2024 3:55 PM Buy: € 0.00, Sell: € 0.00")).once();
    });

    it('should place an order', () => {
        when(calendar.now()).thenReturn(date(2024, 7, 6, 15, 55));

        stockBrokerClient.placeOrders("GOOG 2 3 B");

        verify(printer.write("8/6/2024 3:55 PM Buy: € 6.00, Sell: € 0.00")).once();
        const buyCallArguments = Spies.captureCallsArguments(stockBrokerOnline.buy);
        expect(buyCallArguments).toEqual([[new OrderDto('GOOG', 2, 3)]]);
    });

});

function date(year: number, month: number, day: number, hour: number, minute: number): Date {
    return new Date(year, month, day, hour, minute);
}

class Spies {
    static captureCallsArguments(fn: any): Array<string>[] {
        const calls: { actions: Array<{ args: Array<string> }> } = capture(
            fn
        ) as any as { actions: Array<{ args: Array<string> }> };
        return calls["actions"].map((item: { args: Array<string> }) => item["args"]);
    }
}
