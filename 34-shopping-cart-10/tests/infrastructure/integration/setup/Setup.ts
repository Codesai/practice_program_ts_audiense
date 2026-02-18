import {GenericContainer, Network, StartedNetwork, Wait} from "testcontainers";
import {MariaDbContainer, StartedMariaDbContainer} from "@testcontainers/mariadb";
import {SharedState} from "./SharedState";

export default async function globalSetup() {
    console.log("\nStarting containers...");
    const startTime = Date.now();
    const startedNetwork = await new Network().start();
    const dbNetworkAliases = "db";
    const startedDbContainer = await startDbContainer(startedNetwork, dbNetworkAliases);
    await runDbMigrations(dbNetworkAliases, startedNetwork);

    const endTime = Date.now();
    console.log(`\nContainers start took ${(endTime - startTime) / 1000} seconds...\n`);
    SharedState.create(startedDbContainer, startedNetwork, getDbConfig());
}

async function startDbContainer(startedNetwork: StartedNetwork, dbNetworkAliases: string): Promise<StartedMariaDbContainer> {
    const dbConfig = getDbConfig();
    return await new MariaDbContainer("mariadb:11.7")
        .withNetwork(startedNetwork)
        .withNetworkAliases(dbNetworkAliases)
        .withUsername(dbConfig.user)
        .withUserPassword(dbConfig.password)
        .withDatabase(dbConfig.database)
        .withExposedPorts(dbConfig.port)
        .start();
}

async function runDbMigrations(dbNetworkAliases: string, network: StartedNetwork): Promise<void> {
    const dbConfig = getDbConfig();
    const migrationContainer = await new GenericContainer("flyway/flyway:latest")
        .withCommand([
            `-url=jdbc:mariadb://${dbNetworkAliases}:${dbConfig.port}/${dbConfig.database}`,
            `-user=${dbConfig.user}`,
            `-password=${dbConfig.password}`,
            "migrate",
        ])
        .withBindMounts([
            {
                source: `${process.cwd()}/migrations`,
                target: "/flyway/sql",
            },
        ])
        .withNetwork(network)
        .withWaitStrategy(Wait.forOneShotStartup())
        .start();
    await migrationContainer.stop();
}

function getDbConfig() {
    return {
        host: "localhost",
        port: 3306,
        database: "shopping_cart",
        user: "test",
        password: "password"
    };
}
