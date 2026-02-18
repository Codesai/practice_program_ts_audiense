import mariadb, {Connection} from "mariadb";
import {SharedState} from "./SharedState";

export function dbConnection(): DatabaseConnection {
    return SharedState.getDbConnection();
}

export class DatabaseConnection {
    private readonly host: string;
    private readonly port: number;
    private readonly database: string;
    private readonly user: string;
    private readonly password: string;
    private connection?: Connection;

    constructor(param: { host: string; port: number; database: string; user: string; password: string }) {
        ({host: this.host, port: this.port, database: this.database, user: this.user, password: this.password} = param);
    }

    async get(): Promise<Connection> {
        this.connection = await mariadb.createConnection({
            host: this.host,
            port: this.port,
            database: this.database,
            user: this.user,
            password: this.password
        });
        return this.connection;
    }

    async close(): Promise<void> {
        if (this.connection) {
            await this.connection.end();
        }
    }
}