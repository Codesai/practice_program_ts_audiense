import {Connection} from "mariadb";

export function getDiscountsTable(connection: Connection): DiscountsInDb {
  return new DiscountsInDb(connection);
}

export class DiscountsInDb {

  private readonly connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  //TODO

}
