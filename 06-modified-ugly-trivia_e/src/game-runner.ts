import {Game} from './game';
import {ConsoleNotifier} from "./consoleNotifier";

export class GameRunner {
    static run(): void {
        const game = new Game(new ConsoleNotifier());
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");

        game.run();
    }
}

GameRunner.run();

  