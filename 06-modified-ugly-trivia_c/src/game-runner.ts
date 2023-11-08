import {Game} from './game';

export class GameRunner {
    public static run(): void {
        const game = new Game();
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");

        game.run();
    }
}

GameRunner.run();

  