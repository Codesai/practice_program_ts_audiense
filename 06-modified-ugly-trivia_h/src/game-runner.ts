import {Game} from './domain/game';
import {StringBasedGameEvents} from "./domain/game-events";
import {ConsoleNotifier} from "./infrastructure/consoleNotifier";
import {RandomReferee} from "./infrastructure/randomReferee";
import {AnalogDie} from "./infrastructure/analog-die";

export class GameRunner {
    static run(): void {
        const game: Game = Game.create(
            new RandomReferee(),
            new StringBasedGameEvents(new ConsoleNotifier()),
            new AnalogDie(6));
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");
        game.run();
    }
}

GameRunner.run();

  