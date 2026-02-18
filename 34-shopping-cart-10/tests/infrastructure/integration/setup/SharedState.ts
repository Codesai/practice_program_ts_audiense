import {StartedMariaDbContainer} from "@testcontainers/mariadb";
import {StartedNetwork} from "testcontainers";
import {DatabaseConnection} from "./DatabaseConnection";

export class SharedState {

    static create(startedDbContainer: StartedMariaDbContainer, startedNetwork: StartedNetwork, dbConfig: any): void {
        const myGlobal = globalThis as any;
        myGlobal.__SHOPPING_CART__ = {
            dbContainer: startedDbContainer,
            networkContainer: startedNetwork,
            dbConnection: new DatabaseConnection(
                Object.assign({}, dbConfig, {
                    port: startedDbContainer.getMappedPort(dbConfig.port),
                }))
        };
    }

    static getDbConnection(): DatabaseConnection {
        return this.getGlobalState().dbConnection;
    }

    static getStartedDbContainer(): StartedMariaDbContainer {
        return this.getGlobalState().dbContainer;
    }

    static getStartedNetworkContainer(): StartedNetwork {
        return this.getGlobalState().networkContainer;
    }

    static reset(): void {
        delete (globalThis as any).__SHOPPING_CART__;
    }

    private static getGlobalState(): any {
        return (globalThis as any).__SHOPPING_CART__;
    }
}