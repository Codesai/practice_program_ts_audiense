import {Product} from "./Product";

export interface EmailService {
    subscribeUserFor(_product: Product): void;
}