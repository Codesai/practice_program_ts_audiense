import {GameStateDto} from "../GameStateDto";
import {Field} from "../Field";

export interface PlayerInteraction {
    display(game: GameStateDto): void;

    yourTurn(): Field;
}