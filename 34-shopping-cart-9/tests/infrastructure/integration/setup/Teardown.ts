import {SharedState} from "./SharedState";

export default async function globalTeardown(): Promise<void> {

    const databaseContainer = SharedState.getStartedDbContainer();
    const network = SharedState.getStartedNetworkContainer();
    if (databaseContainer) {
        await databaseContainer.stop();
        console.log('Database Container stopped');
    }
    if (network) {
        await network.stop();
        console.log('Network Container stopped');
    }
    SharedState.reset();
}