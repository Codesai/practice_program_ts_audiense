import {Printer} from "./Printer";
import {Calendar} from "./Calendar";
import {OrderDto} from "./OrderDto";
import {StockBrokerOnline} from "./StockBrokerOnline";

export class StockBrokerClient {
    private consoleWriter: Printer;
    private calendar: Calendar;
    private stockBrokerOnline: StockBrokerOnline;

    constructor(consoleWriter: Printer, calendar: Calendar, stockBrokerOnline: StockBrokerOnline) {
        this.consoleWriter = consoleWriter;
        this.calendar = calendar;
        this.stockBrokerOnline = stockBrokerOnline;

    }

    placeOrders(order: string) {
        let itemValue = 0;
        const orderItems = order.split(",").filter(order => order !== "");
        orderItems.forEach(order => {
            itemValue += this.processOrderItem(order);
            this.stockBrokerOnline.buy(new OrderDto("GOOG", 2, 3));
        })

        const date = this.formatCurrentDate();

        const message = `${date} Buy: € ${itemValue.toFixed(2).replace(",", ".")}, Sell: € 0.00`;
        this.consoleWriter.write(message);
    }

    private formatCurrentDate() {
        return this.calendar.now().toLocaleString('en-US',
            {month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})
            .replace(",", "");
    }

    private processOrderItem(order: string) {
        const [symbol, quantity, price, type] = order.split(" ");
        const quantityNumber = Number(quantity);
        const priceNumber = Number(price);
        return quantityNumber * priceNumber;
    }
};
