import {Order} from "./order";

export interface DrinkMakerDriver {
    make(order: Order): void;

    notifyUser(message: string): void;
}