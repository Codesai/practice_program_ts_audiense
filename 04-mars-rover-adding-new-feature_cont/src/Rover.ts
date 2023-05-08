import {Vector} from "./Vector";
import {NasaCommunicationProtocol} from "./NasaCommunicationProtocol";

export class Rover {
    private readonly DISPLACEMENT: number = 1;
    private readonly communicationProtocol: NasaCommunicationProtocol;
    private vector: Vector;

    constructor(x: number, y: number, direction: string) {
        this.vector = Vector.create(x, y, direction);
        this.communicationProtocol = new NasaCommunicationProtocol();
    }

    receive(message: string): void {
        const commands = this.communicationProtocol.interpret(message);
        commands.forEach((command) => {
            this.vector = command.execute(this.vector, this.DISPLACEMENT);
        })
    }
}