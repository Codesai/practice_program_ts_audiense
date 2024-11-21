import {GameStateDto} from "./GameStateDto";
import {Field} from "./Field";

export interface Player {
    display(game: GameStateDto): void;

    yourTurn(): Field;
}