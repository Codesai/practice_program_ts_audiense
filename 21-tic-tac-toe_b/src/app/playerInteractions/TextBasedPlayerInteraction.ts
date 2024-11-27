import {Field} from "../Field";
import {GameStateDto, OnGoing, Over, Result} from "../GameStateDto";
import {PlayerInteraction} from "../PlayerInteraction";
import {Input} from "../ports/Input";
import {Output} from "../ports/Output";

const fieldsByRepresentation = {
    '1': Field.One,
    '2': Field.Two,
    '3': Field.Three,
    '4': Field.Four,
    '5': Field.Five,
    '6': Field.Six,
    '7': Field.Seven,
    '8': Field.Eight,
    '9': Field.Nine,
}

export class TextBasedPlayerInteraction implements PlayerInteraction {
    private readonly input: Input;
    private readonly output: Output;

    constructor(input: Input, output: Output) {
        this.input = input;
        this.output = output;
    }

    yourTurn(): Field {
        this.output.display("your turn...");
        while (true) {
            const input = this.input.read();
            if (input in fieldsByRepresentation) {
                return fieldsByRepresentation[input as keyof typeof fieldsByRepresentation];
            }
            this.output.display("invalid input, please try again");
        }
    }

    display(gameStateDto: GameStateDto): void {
        this.output.display(this.representGameState(gameStateDto));
    }

    private representGameState(gameStateDto: GameStateDto) {
        return new GameStateRepresentation(gameStateDto).create();
    }
}

class GameStateRepresentation {
    private readonly board: string[][];
    private readonly gameStateDto: GameStateDto;

    constructor(gameStateDto: GameStateDto) {
        this.board = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
        ];
        this.gameStateDto = gameStateDto;
    }

    create(): string {
        return this.representBoard() + this.composeFinalMessage();
    }

    private representBoard(): string {
        return this.fillBoard().map(representRow).join("---------\n");

        function representRow(row: string[]): string {
            return row.join(' | ') + '\n';
        }
    }

    private fillBoard(): string[][] {
        return this.board.map(
            (row: string[]): string[] => {
                return row.map((s: string): string => {
                    return this.representField(s);
                });
            }
        );
    }

    private representField(emptyFieldString: string): string {
        const field: Field = fieldsByRepresentation[emptyFieldString as keyof typeof fieldsByRepresentation];
        if (this.gameStateDto.playerX.includes(field)) {
            return "X";
        }
        if (this.gameStateDto.playerO.includes(field)) {
            return "O";
        }
        return emptyFieldString;
    }

    private composeFinalMessage(): string {
        const gameStatus = this.gameStateDto.status;
        if (gameStatus instanceof OnGoing) {
            return "";
        }
        return composeGameOverMessage(gameStatus);

        function composeGameOverMessage(gameStatus: Over): string {
            if (gameStatus.result === Result.O_Wins) {
                return "O wins!\n";
            }
            if (gameStatus.result === Result.X_Wins) {
                return "X wins!\n";
            }
            return "Draw!\n";
        }
    }
}