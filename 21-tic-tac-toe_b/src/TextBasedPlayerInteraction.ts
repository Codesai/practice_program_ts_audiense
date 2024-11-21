import {Field} from "./Field";
import {GameStateDto} from "./GameStateDto";
import {PlayerInteraction} from "./PlayerInteraction";
import {Input} from "./Input";
import {Output} from "./Output";

export class TextBasedPlayerInteraction implements PlayerInteraction {
    private readonly input: Input;
    private readonly output: Output;

    constructor(input: Input, output: Output) {
        this.input = input;
        this.output = output;
    }

    display(game: GameStateDto): void {
        throw new Error("Method not implemented.");
    }

    yourTurn(): Field {
        throw new Error("Method not implemented.");
    }
}