import {Direction} from "./Direction";
import {Coordinates} from "./Coordinates";

export class Rover {
    private direction: Direction;
    private coordinates: Coordinates;
    private readonly DISPLACEMENT: number = 1;

    constructor(x: number, y: number, direction: string) {
        this.coordinates = new Coordinates(x, y);
        this.direction = Direction.create(direction);
    }

    receive(commandsSequence: string): void {
        const commands = this.extractCommands(commandsSequence);
        commands.forEach(command => this.executeCommand(command));
    }
    private extractCommands(commandsSequence: string): Array<string> {
        const commands: Array<string> = [];
        for (let i = 0; i < commandsSequence.length; ++i) {
            const command = commandsSequence.substring(i, i + 1);
            commands.push(command);
        }
        return commands;
    }

    private executeCommand(command: string): void {
        if (command === "l") {
            this.direction = this.direction.rotateLeft();
        } else if (command === "r") {
            this.direction = this.direction.rotateRight();
        } else if (command === "f") {
            this.coordinates = this.direction.move(this.coordinates, this.DISPLACEMENT);
        } else {
            this.coordinates = this.direction.move(this.coordinates, -this.DISPLACEMENT);
        }
    }
}