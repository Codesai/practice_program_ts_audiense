import {DiscountsRepository} from "../domain/DiscountsRepository";
import {Connection} from "mariadb";
import {Discount} from "../domain/discounts/Discount";

export class MariaDBDiscountsRepository implements DiscountsRepository {
  constructor(connection: Connection) {

  }

  findDiscountWith(discountCode: string): Promise<Discount> {
    throw new Error("Method not implemented.");
  }
}
