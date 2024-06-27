import {OrderDto} from "./OrderDto";

export interface StockBrokerOnline {
    buy(orderDto: OrderDto): boolean;
}