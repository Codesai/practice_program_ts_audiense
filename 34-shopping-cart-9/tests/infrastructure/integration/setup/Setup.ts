import {GenericContainer, Network, StartedNetwork, Wait} from "testcontainers";
import {MariaDbContainer} from "@testcontainers/mariadb";
import {SharedState} from "./SharedState";

export default async function globalSetup() {
    console.log("\nStarting containers...");
    const startTime = Date.now();
    const startedNetwork = await new Network().start();
    const dbNetworkAliases = "db";
    const StartedDbContainer = await StartDbContainer(startedNetwork, dbNetworkAliases);
    await runDbMigrations(dbNetworkAliases, startedNetwork);

    const endTime = Date.now();
    console.log(`\nContainers started in ${endTime - startTime}ms...\n`);
    SharedState.create(StartedDbContainer, startedNetwork, getDbConfig());
}

async function StartDbContainer(startedNetwork: StartedNetwork, dbNetworkAliases: string) {
    const dbConfig = getDbConfig();
    const StartedDbContainer = await new MariaDbContainer("mariadb:11.7")
        .withNetwork(startedNetwork)
        .withNetworkAliases(dbNetworkAliases)
        .withUsername(dbConfig.user)
        .withUserPassword(dbConfig.password)
        .withDatabase(dbConfig.database)
        .withExposedPorts(dbConfig.port)
        .start();
    return StartedDbContainer;
}

async function runDbMigrations(dbNetworkAliases: string, network: StartedNetwork) {
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
