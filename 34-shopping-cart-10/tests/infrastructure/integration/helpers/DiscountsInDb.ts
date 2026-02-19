import {Connection} from "mariadb";

export function getDiscountsTable(connection: Connection): DiscountsInDb {
    return new DiscountsInDb(connection);
}

export class DiscountsInDb {

    private readonly connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async addDiscount({code, type, value}: {
        code: string,
        type: string,
        value: number
    }): Promise<void> {
        await this.connection.query("INSERT INTO discounts (code, type, value) VALUES (?, ?, ?);", [code, type, value]);
    }

    async addDiscountWithMinRequiredAmountCondition(
        {code, type, value, amount}: {
            code: string,
            type: string,
            value: number,
            amount: number
        }
    ): Promise<void> {
        await this.addDiscount({code, type, value});
        await this.connection.query(
            "INSERT INTO discount_conditions (code, type, data) VALUES (?, ?, ?);",
            [code, 'MIN_REQUIRED_AMOUNT', JSON.stringify({value: amount})]
        );
    }

    async drop(): Promise<void> {
        await this.connection.query("DELETE FROM discount_conditions;");
        await this.connection.query("DELETE FROM discounts;");
    }

}
