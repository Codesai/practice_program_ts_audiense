import {Game} from './game';
import {ConsoleNotifier} from "./consoleNotifier";
import {RandomReferee} from "./randomReferee";

export class GameRunner {
    static run(): void {
        const game: Game = Game.create(new ConsoleNotifier(), new RandomReferee());
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");
        game.run();
    }
}

GameRunner.run();

  