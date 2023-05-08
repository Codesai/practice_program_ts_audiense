import {Command, MovingBackwards, MovingForward, TurningLeft, TurningRight, UnknownCommand} from "./Commands";

export class NasaCommunicationProtocol {
    interpret(message: string): Array<Command> {
        return this.parseMessage(message).map(
            (commandRepresentation) => {
                return this.createCommand(commandRepresentation);
            }
        );
    }

    private parseMessage(message: string): Array<string> {
        return message.split("");
    }

    private createCommand(commandRepresentation: string): Command {
        if (commandRepresentation === "r") {
            return new TurningRight();
        }

        if (commandRepresentation === "l") {
            return new TurningLeft();
        }

        if (commandRepresentation === "f") {
            return new MovingForward();
        }

        if (commandRepresentation === "b") {
            return new MovingBackwards();
        }
        return new UnknownCommand();
    }
}