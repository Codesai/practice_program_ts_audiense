import {StartedMariaDbContainer} from "@testcontainers/mariadb";
import {StartedNetwork} from "testcontainers";
import {DatabaseConnection} from "./DatabaseConnection";

export class SharedState {

    static create(StartedDbContainer: StartedMariaDbContainer, startedNetwork: StartedNetwork, dbConfig: any) {
        const myGlobal = globalThis as any;
        myGlobal.__SHOPPING_CART__ = {
            dbContainer: StartedDbContainer,
            networkContainer: startedNetwork,
            dbConnection: new DatabaseConnection(
                Object.assign({}, dbConfig, {
                    port: StartedDbContainer.getMappedPort(dbConfig.port),
                }))
        };
    }

    static getDbConnection(): DatabaseConnection {
        return this.getGlobalState().dbConnection;
    }

    static getStartedDbContainer(): StartedMariaDbContainer{
        return  this.getGlobalState().dbContainer;
    }

    static getStartedNetworkContainer(): StartedNetwork {
        return  this.getGlobalState().networkContainer;
    }

    static reset() {
        delete (globalThis as any).__SHOPPING_CART__;
    }

    private static getGlobalState() {
        return (globalThis as any).__SHOPPING_CART__;
    }
}